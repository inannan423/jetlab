import React, { useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

export function Top (): JSX.Element {
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
    <div
      onClick={
          () => {
            scrollToAnchor('content-start')
          }
      }
      className={'h-12 w-12 bg-gray-100 dark:bg-gray-800 fixed bottom-14 right-3 cursor-pointer rounded-full flex justify-center items-center border-orange-300 border-2'}>
      ↑
    </div>
  )
}
