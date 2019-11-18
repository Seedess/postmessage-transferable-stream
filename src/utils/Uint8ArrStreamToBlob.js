export default function Uint8ArrStreamToBlob(stream, mimeType = 'image/jpg') {
  const reader = stream.getReader()
  return new Promise((resolve, reject) => {
    const arr = []
    const readChunk = () => {
      reader.read().then(
        ({ value, done }) => {
          if (done) {
            resolve(arr)
          } else {
            // value is Uint8Arr
            arr.push(value)
            readChunk()
          }
        },
        (error) => reject(error)
      )
    }
    readChunk()
  })
  .then(arr => new Blob(arr, { type: mimeType }))
}