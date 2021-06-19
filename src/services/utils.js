const handleGet = async promise => {
  return promise
    .then(res => {
      const data = res.docs.map(i => ({
        id: i.id,
        ...i.data(),
      }))
      return {
        ok: true,
        error: null,
        data,
      }
    })
    .catch(err => {
      return {
        ok: false,
        error: err,
        data: null,
      }
    })
}

export { handleGet }
