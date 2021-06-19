import { useEffect, useState } from 'react'

export default function useApiCall(
  promise,
  params,
  condition = true,
  callback = () => {}
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!condition || data !== null) return
    setLoading(true)
    promise(params).then(res => {
      setLoading(false)
      setError(res.error)
      setData(res.data)
      callback(res)
    })
  }, [promise, params, condition, callback, data])

  return [data, loading, error]
}
