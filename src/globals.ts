const Uint8ArrStreamToBlob = require('./utils/Uint8ArrStreamToBlob').default
const StreamToUint8Array = require('./utils/StreamToUint8Array').default
const EventReadableStream = require('./lib/EventReadableStream').default
const PostMessageTransferableStream = require('./lib/PostMessageTransferableStream').default
import Uint8ArrStreamToDataUri from './utils/Uint8ArrStreamToDataUri'


if (typeof global !== 'undefined') {
  Object.assign(global, {
    PostMessageTransferableStream,
    EventReadableStream,
    Uint8ArrStreamToBlob,
    StreamToUint8Array,
    Uint8ArrStreamToDataUri
  })
}