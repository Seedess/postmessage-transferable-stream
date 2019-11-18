import Uint8ArrStreamToBlob from "./Uint8ArrStreamToBlob"

export default async function Uint8ArrStreamToDataUri(stream, mimeType = 'image/jpg') {
  return Uint8ArrStreamToBlob(stream)
    .then(async blob => new Uint8Array(await blob.arrayBuffer()))
    .then(arr => [...arr].map(byte => String.fromCharCode(byte)))
    .then(data => `data:${mimeType};base64,${btoa(data.join(''))}`)
    .catch(error => console.error(error))
}