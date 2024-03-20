import React from 'react'
import { type NavItem } from '../../types'
import Link from 'next/link'
// import { Tooltip } from '@material-tailwind/react'

// 卡片，用于展示友链、项目等
export default function Card ({ item }: { item: NavItem }): JSX.Element {
  return (
  // <Tooltip
  //   placeholder={item.name}
  //   content={item.desc}
  //   animate={{
  //     mount: { scale: 1, y: 0 },
  //     unmount: { scale: 0, y: 25 }
  //   }}
  //   className={'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'}
  // >
      <Link href={item.link} target={'_blank'} className={`w-full h-24 my-1 mr-1 bg-gray-100 dark:bg-gray-900 hover:bg-gray-50 hover:dark:bg-gray-800 rounded-md flex ${item.type === 'friend' ? 'flex-row items-center' : 'flex-col'}  py-2 px-3 transition-all ease duration-700 cursor-pointer`}>
        <div>
          {item.type === 'friend' && (
            <img src={item.avatar} className={'w-16 hidden lg:flex h-16 mr-2 rounded-full opacity-80 cursor-pointer hover:opacity-90 transition-all ease-in-out duration-700'} alt={item.name} />
          )}
        </div>
        <div className={'ml-2'}>
          <div className={'card_title text-base lg:text-xl underline underline-offset-2 decoration-orange-500 decoration-dashed decoration-2 h-min mb-3'}>
            {item.name}
          </div>
          <div
            // 限制文字三排，超出的部分用省略号代替
            className={'text-sm h-2/3 mt-4 overflow-hidden overflow-ellipsis overflow-ellipsis-3 truncate '}
          >
            {item.desc}
          </div>
        </div>
      </Link>
  // </Tooltip>
  )
}
