import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const supabaseUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}.supabase.co`
const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_KEY)
const supabase = createClient(supabaseUrl, supabaseKey)

function Visitors (): any {
  // 当刚进入页面时，获取数据表 visitors 的 id 为 1 的数据
  // eslint-disable-next-line
  const [visitors, setVisitors] = useState<any>()
  // @ts-ignore
  useEffect(async () => {
    const {
      // eslint-disable-next-line
      data,
      // eslint-disable-next-line
      error
    } = await supabase
      .from('visitor')
      .select('*')
    // console.log(data)
    // console.log(error)
  }, [])
  return visitors
}

export default Visitors
