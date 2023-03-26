export default async function handler (req, res): Promise<any> {
  await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: process.env.LARK_APP_ID,
      app_secret: process.env.LARK_APP_SECRET
    })
  }).then(async (res) => await res.json()).then((data) => {
    fetch(`https://open.feishu.cn/open-apis/wiki/v2/spaces/${String(process.env.LARK_SPACE_ID)}/nodes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${String(data.tenant_access_token)}`
      }
    }).then(async (res) => await res.json()).then((data) => {
      res.status(200).json(data.data)
    }).catch((err) => {
      res.status(500).json({ error: err })
    })
  }).catch((err) => {
    res.status(500).json({ error: err })
  })
}
