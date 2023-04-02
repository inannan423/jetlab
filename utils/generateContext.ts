import type { Context, contextChild, contextItems } from '../types'

export default function generateContext (json: any, title: string): Context {
  const context: Context = {
    title,
    children: []
  }
  for (const key in json) {
    // eslint-disable-next-line
    if (json.hasOwnProperty(key)) {
      const value = json[key]
      if (key.startsWith('--')) {
        const child: contextItems = {
          title: value.title,
          children: []
        }
        context.children.push(child)
      } else {
        const child: contextChild = {
          link: value,
          title: key
        }
        if (context.children.length === 0) {
          context.children.push({
            title: '',
            children: []
          })
        }
        context.children[context.children.length - 1].children.push(child)
      }
    }
  }
  return context
}
