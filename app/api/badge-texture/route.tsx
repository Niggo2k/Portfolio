import { ImageResponse } from 'next/og'
import { profile, socialLinks } from '@/lib/portfolio-data'
import QRCode from 'qrcode'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export const revalidate = 3600 // 1 hour

// Types for GitHub contribution data
interface ContributionDay {
  contributionCount: number
  date: string
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionData {
  totalContributions: number
  weeks: ContributionWeek[]
}

interface CacheData {
  data: ContributionData
  timestamp: number
}

// Cache TTL: 24 hours in milliseconds
const CACHE_TTL = 24 * 60 * 60 * 1000

// In-memory cache fallback
let memoryCache: CacheData | null = null

async function loadLocalImage(path: string): Promise<string> {
  const publicPath = join(process.cwd(), 'public', path)
  const imageBuffer = await readFile(publicPath)
  const base64 = imageBuffer.toString('base64')
  const extension = path.split('.').pop()?.toLowerCase()
  const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg'
  return `data:${mimeType};base64,${base64}`
}

// Extract GitHub username from socialLinks
function getGitHubUsername(): string {
  const githubLink = socialLinks.find(l => l.platform === 'github')
  if (!githubLink) return 'Niggo2k'
  return githubLink.url.split('/').pop() || 'Niggo2k'
}

// Get cache file path
function getCacheFilePath(username: string): string {
  return join(tmpdir(), `github-contributions-${username}.json`)
}

// Read from cache
async function readCache(username: string): Promise<CacheData | null> {
  try {
    const cachePath = getCacheFilePath(username)
    const cacheContent = await readFile(cachePath, 'utf-8')
    return JSON.parse(cacheContent) as CacheData
  } catch {
    return memoryCache
  }
}

// Write to cache
async function writeCache(username: string, data: ContributionData): Promise<void> {
  const cacheData: CacheData = {
    data,
    timestamp: Date.now(),
  }

  // Always update memory cache
  memoryCache = cacheData

  try {
    const cachePath = getCacheFilePath(username)
    await writeFile(cachePath, JSON.stringify(cacheData), 'utf-8')
  } catch (e) {
    console.error('Failed to write cache to file:', e)
  }
}

// Fetch contribution data from GitHub GraphQL API
async function fetchContributions(username: string): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN

  // Calculate date range (last 12 months)
  const to = new Date()
  const from = new Date()
  from.setMonth(from.getMonth() - 12)

  // Try to get cached data first
  const cached = await readCache(username)
  const isCacheValid = cached && (Date.now() - cached.timestamp) < CACHE_TTL

  if (isCacheValid) {
    return cached.data
  }

  // If no token, return cached data (even if stale) or empty data
  if (!token) {
    console.warn('GITHUB_TOKEN not set, using cached or fallback data')
    if (cached) return cached.data
    return { totalContributions: 0, weeks: [] }
  }

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

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`)
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(json.errors[0]?.message || 'GraphQL error')
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar

    if (!calendar) {
      throw new Error('No contribution data found')
    }

    const data: ContributionData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    }

    // Cache the successful response
    await writeCache(username, data)

    return data
  } catch (e) {
    console.error('Failed to fetch GitHub contributions:', e)
    // Return stale cache on failure
    if (cached) return cached.data
    return { totalContributions: 0, weeks: [] }
  }
}

// Map contribution count to opacity (5 levels)
function getOpacityForCount(count: number, maxCount: number): number {
  if (count === 0) return 0.1
  if (maxCount === 0) return 0.1

  const ratio = count / maxCount
  if (ratio <= 0.25) return 0.3
  if (ratio <= 0.5) return 0.5
  if (ratio <= 0.75) return 0.75
  return 1.0
}

export async function GET() {
  // Soft pastel design - charcoal gray text
  const textColor = 'lab(35.6337% -1.58697 -10.8425)'

  // Load avatar image
  let avatarDataUrl: string | null = null
  if (profile.avatar) {
    try {
      avatarDataUrl = await loadLocalImage(profile.avatar)
    } catch (e) {
      console.error('Failed to load avatar:', e)
    }
  }

  // Generate QR code as SVG (dark on transparent for pastel background)
  let qrDataUrl = ''
  try {
    const qrSvg = await QRCode.toString('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
      type: 'svg',
      width: 100,
      margin: 0,
      color: {
        dark: '#374151',
        light: '#00000000',
      },
    })
    qrDataUrl = `data:image/svg+xml;base64,${Buffer.from(qrSvg).toString('base64')}`
  } catch (e) {
    console.error('QR code generation failed:', e)
  }

  // Fetch GitHub contribution data
  const githubUsername = getGitHubUsername()
  const contributions = await fetchContributions(githubUsername)

  // Find max contribution count for opacity scaling
  const maxCount = contributions.weeks.reduce((max, week) => {
    return Math.max(max, ...week.contributionDays.map(d => d.contributionCount))
  }, 0)

  // Cell styling for contribution graph
  const cellSize = 10
  const cellGap = 2
  const cellRadius = 2
  const baseColor = 'lab(35.6337% -1.58697 -10.8425)'

  // Current year for dynamic badge
  const currentYear = new Date().getFullYear()
  const backgroundImageUrl = await loadLocalImage('/images/bg-light.png')

  // Colored dots
  const dots = [
    { color: '#6366f1' }, // Blue
    { color: '#8b5cf6' }, // Purple
    { color: '#a78bfa' }, // Lavender
    { color: '#ec4899' }, // Pink
  ]

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          filter: 'saturate(2)',
        }}
      >
        <div style={{ display: 'flex', height: '76%', width: '100%' }}>
          {/* Front Section (Left 50%) - Pastel gradient */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              height: '100%',
              position: 'relative',
            }}
          >
            <img
              src={backgroundImageUrl}
              alt="Background Image"
              style={{
                width: '100%',
                height: '100%',
                inset: 0,
                position: 'absolute',
                objectFit: 'cover',
                display: 'flex',
              }}
            />
            <div style={{
              padding: '30px 35px',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}>
            {/* Year badge - top right */}
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 30,
                right: 35,
                  fontSize: 32,
                fontWeight: 700,
                color: textColor,
                opacity: 0.7,
              }}
            >
              {currentYear}
            </div>

            {/* Main content area - avatar left, info right */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: "30%",
                flex: 1,
              }}
            >
              {/* Avatar with rounded rectangle frame */}
              {avatarDataUrl && (
                <div
                  style={{
                    display: 'flex',
                    width: 180,
                    height: 220,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'linear-gradient(to top, mix(rgba(255, 255, 255, 0.5), white, 0.5) 0%, rgba(255, 255, 255, 0.6) 100%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={avatarDataUrl}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}

              {/* Info section - right of avatar */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 25,
                  justifyContent: 'center',
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                      fontSize: 48,
                    fontWeight: 700,
                    color: textColor,
                  }}
                >
                  {profile.name.split(' ')[0]}
                </div>
                <div
                  style={{
                    display: 'flex',
                      fontSize: 48,
                    fontWeight: 700,
                    color: textColor,
                  }}
                >
                  {profile.name.split(' ')[1]}
                </div>
                <div
                  style={{
                    display: 'flex',
                      fontSize: 24,
                    color: textColor,
                    marginTop: 8,
                    opacity: 0.8,
                  }}
                >
                  {profile.title}
                </div>

                {/* Colored dots */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 20,
                    gap: 10,
                  }}
                >
                  {dots.map((dot, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: dot.color,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row - logo left, QR right */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: 'auto',
              }}
            >
              {/* GitHub Contribution Graph - Rotated 90° (vertical) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 20,
                  width: '100%',
                }}
              >

                {/* Contribution count */}
                <div
                  style={{
                    display: 'flex',
                      fontSize: 21,
                    fontWeight: 500,
                    color: textColor,
                    opacity: 0.7,
                    marginBottom: 20,
                  }}
                >
                  {contributions.totalContributions.toLocaleString()} contributions
                </div>
                {/* Graph container - rows are days (Mon-Sun), columns are weeks */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                      alignItems: 'flex-end',
                      paddingLeft: 16,
                      WebkitMaskImage: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%)",
                      maskImage: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%)",
                      overflow: 'hidden',
                      gap: cellGap,
                      width: '100%',
                  }}
                >
                  {/* Render 7 rows (days of the week) */}
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                    <div
                      key={dayIndex}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: cellGap,
                      }}
                    >
                      {/* Render each week's contribution for this day */}
                      {contributions.weeks.map((week, weekIndex) => {
                        const day = week.contributionDays[dayIndex]
                        const opacity = day
                          ? getOpacityForCount(day.contributionCount, maxCount)
                          : 0.1
                        return (
                          <div
                            key={weekIndex}
                            style={{
                              display: 'flex',
                              width: cellSize,
                              height: cellSize,
                              borderRadius: cellRadius,
                              backgroundColor: baseColor,
                              opacity,
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Back Section (Right 50%) - Mirrored pastel gradient */}
          <div
            style={{
              display: 'flex',
              width: '50%',
              height: '100%',
              position: 'relative',
            }}>
            <img
              src={backgroundImageUrl}
              alt="Background Image"
              style={{
                width: '100%',
                height: '100%',
                transform: 'scaleX(-1)',
                inset: 0,
                position: 'absolute',
                objectFit: 'cover',
                display: 'flex',
              }}
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%'
            }}>
            {qrDataUrl && (
              <div
                style={{
                  display: 'flex',
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: 20,
                }}
              >
                <img
                  src={qrDataUrl}
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
            )}
          </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: '24%' }}></div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    }
  )
}
