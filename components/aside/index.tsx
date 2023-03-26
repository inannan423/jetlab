import React, { useEffect } from 'react'
import { type NavCatagory } from '../../types'
import smoothscroll from 'smoothscroll-polyfill'

export function Aside ({ data }: { data: NavCatagory[] }): JSX.Element {
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
    <div className={'w-full h-48 lg:h-max overflow-auto rounded-md bg-gray-100 dark:bg-gray-900 px-3 py-2 flex flex-col items-center justify-start lg:justify-center'}>
      <div className={'my-2 pb-1 font-bold border-b-4 border-orange-300 cursor-pointer'}>
        目录
      </div>
      {
        data.map((item, index) => {
          return (
            <div
              // id={'anchor' + String(item.id)}
              key={index}
              onClick={
                () => {
                  scrollToAnchor('anchor' + String(item.id))
                }
              }
              className={'my-1 cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-800'}
            >
              {item.name}
            </div>
          )
        })
      }
    </div>
  )
}
