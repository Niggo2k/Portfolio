import { unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import { NextResponse } from 'next/server'
import { socialLinks } from '@/lib/portfolio-data'

function getGitHubUsername(): string {
  const githubLink = socialLinks.find(l => l.platform === 'github')
  if (!githubLink) return 'Niggo2k'
  return githubLink.url.split('/').pop() || 'Niggo2k'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  // Security: require secret token
  if (token !== process.env.CACHE_CLEAR_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const username = getGitHubUsername()
  const cachePath = join(tmpdir(), `github-contributions-${username}.json`)

  // Step 1: Delete existing cache file
  try {
    await unlink(cachePath)
  } catch {
    // File may not exist, that's okay
  }

  // Step 2: Fetch fresh data from GitHub
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    return NextResponse.json({
      success: false,
      error: 'GITHUB_TOKEN not configured'
    }, { status: 500 })
  }

  const to = new Date()
  const from = new Date()
  from.setMonth(from.getMonth() - 3)

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username, from: from.toISOString(), to: to.toISOString() },
    }),
  })

  if (!response.ok) {
    return NextResponse.json({
      success: false,
      error: `GitHub API returned ${response.status}`
    }, { status: 502 })
  }

  const json = await response.json()
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    return NextResponse.json({
      success: false,
      error: 'No contribution data found'
    }, { status: 404 })
  }

  // Step 3: Write fresh data to cache
  const cacheData = {
    data: {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    },
    timestamp: Date.now(),
  }

  await writeFile(cachePath, JSON.stringify(cacheData), 'utf-8')

  return NextResponse.json({
    success: true,
    message: 'Cache cleared and data refetched',
    totalContributions: calendar.totalContributions,
    timestamp: new Date().toISOString()
  })
}
