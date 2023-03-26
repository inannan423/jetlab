import React, { useEffect } from 'react'
import { type NavCatagory } from '../../types'
import Card from '../card'
import smoothscroll from 'smoothscroll-polyfill'
import Link from 'next/link'
import { TbBalloon } from 'react-icons/tb'

export default function Content ({ nav }: { nav: NavCatagory[] }): JSX.Element {
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])
  const scrollToAnchor = (anchorName: string): void => {
    if (anchorName !== '') {
      const anchorElement = document.getElementById(anchorName)
      if (anchorElement != null) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }
  return (
        <div className={'w-full flex flex-col px-3'}>
          {nav.map((item, index) => {
            return (
              <div key={index} className={'relative w-full'}>
                <div id={'anchor' + String(item.id)} className={'h-32 w-32 absolute -top-20 -z-20'}></div>
                <div
                    onClick={
                        () => {
                          scrollToAnchor('anchor' + String(item.id))
                        }
                    }
                  className={'content_title cursor-pointer text-xl pl-2 border-l-4 border-orange-300 my-3 font-bold'}>
                    {item.name}
                </div>
                <div className={'my-3 opacity-60'}>
                  {item.desc}
                </div>
                <div className={'w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'}>
                    {item.navs.map((item, index) => {
                      return (
                        <Card item={item} key={index} />
                      )
                    })}
                    {
                      item.id === 0 && (
                        <Link href={'https://github.com/inannan423/jetlab/issues'} target={'_blank'} className={'relative overflow-hidden w-full h-24 my-1 mr-1  bg-orange-100 dark:bg-orange-900 hover:bg-gray-50 hover:dark:bg-gray-800 rounded-md flex flex-col py-2 px-3 transition-all ease duration-700 cursor-pointer'}>
                          <div className={'z-10 card_title text-base lg:text-xl text-orange-500 h-min mb-3'}>
                            交换友链
                          </div>
                          <div
                            // 限制文字三排，超出的部分用省略号代替
                            className={'z-10 opacity-50 text-sm h-2/3 mt-4 overflow-hidden overflow-ellipsis overflow-ellipsis-3 truncate '}
                          >
                            点击这里，添加你的博客
                          </div>
                          <div className={'z-0 absolute bottom-3 right-3 opacity-60'}>
                            <TbBalloon color={'white'} className={'text-7xl'} />
                          </div>
                        </Link>
                      )
                    }
                </div>
              </div>
            )
          })}
        </div>
  )
}
