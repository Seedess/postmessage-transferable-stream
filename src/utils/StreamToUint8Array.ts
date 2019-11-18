/**
 * Return the full stream contents as ByteArray of Uint8
 * @note Returning an Array is faster
 * @todo optimize  new Uint8Array([ ...arr, ...value ])
 */
export default function StreamToUint8Array(stream:ReadableStream) {
  if (!(stream instanceof ReadableStream)) {
    throw TypeError('stream must be instance of ReadableStream')
  }
  const reader:ReadableStreamReader = stream.getReader()
  let arr:any = []
  return new Promise((resolve:Function) => {
    const readChunk = async () => {
      const { value, done } = await reader.read()
      if (done) return resolve(arr)
      arr = new Uint8Array([ ...arr, ...value ])
      readChunk()
    }
    readChunk()
  })
}