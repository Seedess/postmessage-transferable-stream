export default async function Uint8ArrStreamToDataUri(stream, mimeType = 'image/jpg') {
  const reader = stream.getReader()
  return new Promise((resolve, reject) => {
    let str = ''
    log('reading from stream', stream, reader)
    const readChunk = () => {
      reader.read().then(
        ({ value, done }) => {
          if (done) {
            log('read stream done')
            const base64str = btoa(str)
            resolve(base64str)
          } else {
            // value is Uint8Arr
            log('page 2 read stream chunk', value)
            str = String.fromCharCode.apply(null, value)
            readChunk()
          }
        },
        (error) => reject(error)
      )
    }
    readChunk()
  })
  .then(data => `data:${mimeType};base64,${data}`)
  .catch(error => alert(error))
}