import React from 'react'
import { type DocsThemeConfig } from 'nextra-theme-docs'
import Link from 'next/link'

export const VercelLogo = (): JSX.Element => (
  <div>
    <Link
      className="flex items-center gap-1 text-current"
      target="_blank"
      rel="noopener noreferrer"
      title="vercel.com homepage"
      href="https://vercel.com"
    >
      <svg height={20} viewBox="0 0 283 64" fill="none">
        {/* <div>Vercel</div> */}
        <path
          fill="currentColor"
          d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
        />
      </svg>
    </Link>
  </div>
)

// #6DDBFC
export const Logo = ({ height, color }: { height: number, color: string }): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={height} height={height} viewBox="0 0 266 266" fill="none">
        <defs>
            <rect id="path_0" x="0" y="0" width="266" height="266" />
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 133 133)">
            <mask id="bg-mask-0" fill="white">
                <use xlinkHref="#path_0"></use>
            </mask>
            <g mask="url(#bg-mask-0)" >
                <g opacity="1" transform="translate(22.166666666666664 21.8203125)  rotate(0 110.83333333333331 111.00651041666666)">
                    <path id="路径 1" style={{ stroke: color, strokeWidth: '22.173333333333332', strokeOpacity: 1, strokeDasharray: '0 0' }} transform="translate(0 0)  rotate(0 105.9074074074074 108.34651041666667)" d="M149.63,216.47C149.63,216.47 77.58,222.01 38.79,177.68C0,133.35 0,0.35 0,0.35C0,0.35 133,-5.2 177.33,28.05C221.67,61.3 210.58,155.51 210.58,155.51 " />
                    <path id="路径 2" style={{ stroke: color, strokeWidth: '22.173333333333332', strokeOpacity: 1, strokeDasharray: '0 0' }} transform="translate(66.5 50.22135416666666)  rotate(0 77.58333333333331 85.89583333333331)" d="M155.17,171.79C155.17,171.79 93.21,124.97 55.42,83.12C17.62,41.28 0,0 0,0 " />
                    <path id="路径 3" style={{ stroke: color, strokeWidth: '22.173333333333332', strokeOpacity: 1, strokeDasharray: '0 0' }} transform="translate(121.91666666666666 61.3046875)  rotate(0 2.770833333333333 36.02083333333333)" d="M0,72.04L5.54,0 " />
                    <path id="路径 4" style={{ stroke: color, strokeWidth: '22.173333333333332', strokeOpacity: 1, strokeDasharray: '0 0' }} transform="translate(66.5 127.8046875)  rotate(0 27.70833333333333 2.770833333333333)" d="M55.42,5.54L0,0 " />
                </g>
            </g>
        </g>
    </svg>
)

const config: DocsThemeConfig = {
  head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="JetLab" />
            <meta property="og:description" content="JetLab Personal Blog" />
            <link rel="icon" href="/leaves.svg" />
        </>
  ),
  project: {
    link: 'https://github.com/inannan423/jetlab'
  },
  docsRepositoryBase: 'https://github.com/inannan423/jetlab/tree/main',
  // banner: {
  //   key: 'beta 0.0.1',
  //   text: <a href="https://nextra.site" target="_blank" rel="noreferrer">
  //     🎉 Nextra 2.0 is released. Read more →
  //   </a>
  // },
  feedback: {
    content: null
  },
  sidebar: {
    titleComponent ({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  editLink: {
    text: '帮我在 GitHub 改进文章'
  },
  primaryHue: { dark: 205, light: 205 },
  logo: (<>
      <Logo height={30} color={'#6DDBFC'} />
      <div className={'ml-3 nx-font-mono text-2xl hover:underline hover:decoration-pink-500 transition-all ease'}>JetLab</div>
  </>),
  useNextSeoProps () {
    return {
      titleTemplate: ' %s | JetLab 🍃'
    }
  },
  footer: {
    text: <div className={'flex flex-col lg:flex-row w-full'}>
      <div className={'flex flex-col w-full justify-between'}>
        <div className={'flex h-max'}>
          <Logo height={30} color={'green'} />
          <div className={'ml-3 font-bold nx-font-mono text-2xl hover:underline hover:decoration-pink-500 transition-all ease'}>JetLab</div>
        </div>
        <div className={'mt-3 font-sans font-thin'}>
          @{new Date().getFullYear()} JetLab. All rights reserved.
        </div>
      </div>
      <div className={'h-full w-max flex justify-center items-center mt-3 lg:mt-0'}>
         <div className={'text-black dark:text-white w-max h-10 flex justify-center items-center mr-3 text-center whitespace-nowrap'}>Powered by</div>
          <VercelLogo />
      </div>
    </div>
  }
}

export default config
