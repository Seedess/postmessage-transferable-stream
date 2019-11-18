const Uint8ArrStreamToBlob = require('./utils/Uint8ArrStreamToBlob').default
const EventReadableStream = require('./lib/EventReadableStream').default
const PostMessageTransferableStream = require('./lib/PostMessageTransferableStream').default


if (typeof window !== 'undefined') {
  Object.assign(window, {
    PostMessageTransferableStream,
    EventReadableStream,
    Uint8ArrStreamToBlob,
  })
}