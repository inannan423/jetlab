import '../style.css'
import React from 'react'
// import localFont from '@next/font/local'
// Vercel Analytics Vercel 分析
import { Analytics } from '@vercel/analytics/react'
// const myFont = localFont({ src: './PingFangSC.ttf' })

export default function App ({ Component, pageProps }): JSX.Element {
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
  return <main>
    <Component {...pageProps} />
    <Analytics />
  </main>
}
