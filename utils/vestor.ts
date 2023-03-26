import { useState, useEffect } from 'react'

interface VestorProps {
  url: string
}

interface count {
  page_name: string
  visit_count: number
}

export default function Vestor ({ url }: VestorProps): count {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [data, setData] = useState<count>()
  // 获取当前页面的 host 后面的路径
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let page_name
  if (typeof window !== 'undefined') {
    page_name = window.location.pathname
  } else {
    page_name = '/'
  }
  if (page_name === '/') {
    page_name = 'home'
  } else {
    page_name = page_name.replace('/', '')
  }
  // 获取用户的 ip 地址
  const [ip, setIp] = useState<string>()

  useEffect(() => {
    void fetch('http://ip-api.com/json', {
      method: 'GET',
      mode: 'cors'
    }).then(async (response) => {
      return await response.json()
    }).then((data) => {
      setIp(data.query)
    })
  }, [page_name])

  useEffect(() => {
    // eslint-disable-next-line
    if (!(Boolean(loaded))) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      void fetch(String(url) + '/visit?ip=' + ip + '&page_name=' + page_name, {
        method: 'GET',
        mode: 'cors'
      }).then(async (response) => {
        return await response.json()
      }).then((data) => {
        console.log('🚀Use Vestor to track your website visit count. ' + 'https://github.com/inannan423/Vestor')
        setLoaded(true)
      })
    }
  }, [url])

  useEffect(() => {
    void fetch(String(url) + '/data?page_name=' + page_name, {
      method: 'GET',
      mode: 'cors'
    }).then(async (response) => {
      return await response.json()
    }).then((data) => {
      setData(data)
    })
  }, [url, page_name])

  // @ts-ignore
  return data
}
