import '../style.css'
import React from 'react'
// import localFont from '@next/font/local'
// Vercel Analytics Vercel 分析
import { Analytics } from '@vercel/analytics/react'
// Initialize Userpilot with your API key
// const myFont = localFont({ src: './PingFangSC.ttf' })
import { Noto_Sans_SC } from 'next/font/google'
import mixpanel from 'mixpanel-browser'

// If loading a variable font, you don't need to specify the font weight
const font = Noto_Sans_SC({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }): React.ReactElement {
  React.useEffect(() => {
    const threeScript = document.createElement('script')
    threeScript.setAttribute('id', 'threeScript')
    threeScript.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
    )
    document.getElementsByTagName('head')[0].appendChild(threeScript)
    return () => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (threeScript) {
        threeScript.remove()
      }
    }
  }, [])

  React.useEffect(() => {
    console.log('mixpanel.init')
    mixpanel.init(
      process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN as string,
      { track_pageview: 'full-url' })
  }, [])

  return <main className={font.className}>
    <Component {...pageProps} />
    <Analytics />
  </main>
}
