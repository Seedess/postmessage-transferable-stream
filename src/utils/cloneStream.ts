export default function cloneStream(stream:ReadableStream) {
  return stream.tee()
}