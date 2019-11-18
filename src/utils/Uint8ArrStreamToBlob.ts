import StreamToUint8Array from "./StreamToUint8Array"

export default function Uint8ArrStreamToBlob(stream:ReadableStream, mimeType:string = 'image/jpg') {
  if (!(stream instanceof ReadableStream)) {
    throw TypeError('stream must be instance of ReadableStream')
  }
  return StreamToUint8Array(stream)
    .then((arr:Uint8Array) => new Blob([arr], { type: mimeType }))
}