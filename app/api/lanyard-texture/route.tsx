import { ImageResponse } from 'next/og'

export const revalidate = 86400 // 24 hours

export async function GET() {
  const width = 414
  const height = 100

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#fafafa',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Additional subtle grain overlay */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(190deg, #a8c0ff 0% 8%, #b8caff 15%, #e8d4ff 22%, #f8e0f8 28%, #fff0fa, #fffeff 42%, #fff 55% 100%)',
          }}
        />
      </div>
    ),
    {
      width,
      height,
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    }
  )
}
