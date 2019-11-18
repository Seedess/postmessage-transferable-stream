const debug = require('debug')('PostMessageTransferableStream:EventReadableStream')

/**
 * ReadableStream from Message Event
 */
export default class EventReadableStream {

  event: MessageEvent
  readable: ReadableStream
  log: Function = debug

  constructor(event: MessageEvent) {
    this.event = event
    this.readable = this.createReadableStreamFromEvent(event)
    Object.assign(this.readable, { id: Math.random() })
  }

  createReadableStreamFromEvent(event: MessageEvent) {
    const log = this.log
    log('createReadableStreamFromEvent', event)
    const port = event.ports[0]
    const readable = new ReadableStream({
      pull(controller) {
        log('requesting data', event, window.location.search)
        port.postMessage(true) // send a pull request
        return new Promise(resolve => {
          port.onmessage = evt => {
            if (evt.data) {
              log('received data', evt.data)
              controller.enqueue(evt.data) // evt.data is Uint8Array
            } else if (evt.data === null) {
              log('stream close received')
              controller.close() // evt.data is null, means the stream ended
            }
            resolve()
          }
        })
      },
      cancel() {
        // This event is never executed
        log('request aborted')
        port.postMessage(false) // send a cancel request
      }
    })
    return readable
  }

}