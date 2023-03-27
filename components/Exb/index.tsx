import React from 'react'

export default function Exb ({ children, classes = '' }: { children: React.ReactNode, classes?: string }): JSX.Element {
  return (
    <div className={`w-full h-max px-2 py-3 rounded-md bg-gray-200 dark:bg-gray-900 ${classes !== '' ? classes : ''}`} >
      {children}
    </div>
  )
}
