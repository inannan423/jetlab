import { Sandpack } from '@codesandbox/sandpack-react'
// @ts-ignore
import { nightOwl } from '@codesandbox/sandpack-themes'
import React from 'react'

const App = ({
  files
}: {
  files: any
}): React.ReactElement => {

  return (
    <Sandpack
      files={files}
      theme={nightOwl}
      template="nextjs"
      options={{
        showConsoleButton: true,
        showInlineErrors: true,
        showNavigator: true,
        showLineNumbers: true,
        showTabs: true
      }}
    />
  )
}

export default App
