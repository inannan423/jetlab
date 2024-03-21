import '../style.css'
import React from 'react'
// import localFont from '@next/font/local'
// Vercel Analytics Vercel 分析
import { Analytics } from '@vercel/analytics/react'
import { Userpilot } from 'userpilot'
// Initialize Userpilot with your API key
// const myFont = localFont({ src: './PingFangSC.ttf' })
import { Noto_Sans_SC } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const font = Noto_Sans_SC({ weight: '400', subsets: ['latin'] })

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

  React.useEffect(() => {
    console.log('Userpilot initialized')
    Userpilot.initialize('NX-ecc6c81c')

    Userpilot.identify(
      'user-id-123', // Replace with your unique identifier for the user
      {
        name: 'John Doe',
        email: 'jetzihan@outlook.com',
        created_at: '2023-08-01'
      }
    )
  }, [])

  return <main className={font.className}>
    <Component {...pageProps} />
    <Analytics />
  </main>
}
