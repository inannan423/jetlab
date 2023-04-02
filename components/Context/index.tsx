// import { type Context as TypeContext } from '../../types'
import { generateContext } from '../../utils'
import React from 'react'
import Link from 'next/link'

export default function Context ({ json, title }: {
  json: string
  title: string
}): JSX.Element {
  const res = generateContext(json, title)
  return (
    <div className={'w-full flex flex-col'}>
      {
        res.children.map(
          (item, index) => {
            return (
              <div key={index}>
                <div className={'font-bold text-xl'}>
                  {item.title}
                </div>
                <div className={'grid grid-cols-2 lg:grid-cols-3 my-3 gap-2'}>
                  {
                    item.children.map(
                      (item, index) => {
                        return (
                          <Link href={item.title === 'index' ? '' : `${res.title}/${item.title}`} key={index} className={'flex border-gray-100 dark:border-gray-900 border-2 px-3 py-5 bg-gray-100 dark:bg-gray-900 hover:bg-gray-50 rounded-lg hover:dark:bg-gray-800 transition-all ease duration-800'}>
                            {item.link}
                          </Link>
                        )
                      }
                    )
                  }
                </div>
              </div>
            )
          }
        )
      }
    </div>
  )
}
