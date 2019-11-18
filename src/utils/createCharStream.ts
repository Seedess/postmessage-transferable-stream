export default function createCharStream(chars:string = 'abc') {
  const arr = chars.split('')
  const charStream = new ReadableStream({
    start(controller) {
      const enqueNextChunk = () => {
        const chunk = arr.shift()
        controller.enqueue(chunk)
        if (chunk) enqueNextChunk()
      }
      enqueNextChunk()
    },
    cancel() {
      // This event is never executed
      alert('stream request aborted')
    }
  })
  return charStream
}