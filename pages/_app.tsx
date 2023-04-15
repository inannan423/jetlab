import '../style.css'
import React from 'react'
import localFont from '@next/font/local'
// Vercel Analytics Vercel 分析
import { Analytics } from '@vercel/analytics/react'
const myFont = localFont({ src: './PingFangSC.ttf' })

export default function App ({ Component, pageProps }): JSX.Element {
  return <main className={myFont.className}>
    <Component {...pageProps} />
    <Analytics />
  </main>
}
