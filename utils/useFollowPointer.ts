import { useState, type RefObject, useEffect } from 'react'

export default function useFollowPointer (ref: RefObject<HTMLElement>): { x: number, y: number } {
  const [point, setPoint] = useState({ x: 20, y: 30 })

  useEffect(() => {
    // eslint-disable-next-line
    if (!ref.current) return

    // eslint-disable-next-line
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      // eslint-disable-next-line
      const element = ref.current!

      // 将 x, y 的值限制在 -50 ~ 50 之间
      const x = Math.max(-50, Math.min(50, clientX - element.offsetLeft - element.offsetWidth / 2))
      const y = Math.max(-50, Math.min(50, clientY - element.offsetTop - element.offsetHeight / 2))

      setPoint({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => { window.removeEventListener('pointermove', handlePointerMove) }
  }, [])

  return point
}
