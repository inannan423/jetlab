// @ts-nocheck
import React from 'react'
import { type DocsThemeConfig } from 'nextra-theme-docs'
import Link from 'next/link'
import { BiMeteor } from 'react-icons/bi'

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
    content: '有问题？提一个 issue'
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  editLink: {
    // 帮我在 GitHub 改进文章
    text: '帮我在 GitHub 改进文章'
  },
  primaryHue: { dark: 353, light: 353 },
  logo: (<div className={'hover:opacity-30 transition-all ease flex'}>
    <BiMeteor className={'text-3xl text-red-500'} />
    <div className={'ml-2 nx-font-mono text-2xl'}>JetLab</div>
  </div>),
  useNextSeoProps() {
    return {
      titleTemplate: ' %s - JetLab 🍃'
    }
  },
  themeSwitch: {
    useOptions() {
      return {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      }
    }
  },
  footer: {
    text: <div className={'flex flex-col lg:flex-row w-full'}>
      <div className={'flex flex-col w-full justify-between'}>
        <div className={'flex h-max'}>
          <BiMeteor className={'text-3xl text-red-500'} />
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
