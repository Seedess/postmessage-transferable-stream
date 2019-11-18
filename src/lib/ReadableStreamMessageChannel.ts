const debug = require('debug')('PostMessageTransferableStream:ReadableStreamMessageChannel')

/**
 * Create a message channel for a readable stream
 */
export default class ReadableStreamMessageChannel {

  readable: ReadableStream
  messageChannel: MessageChannel
  log: Function = debug

  constructor(readable: ReadableStream) {
    this.messageChannel = this.createMessageChannelForReadableStream(readable)
  }

  /**
   * Message channel: pull=true, cancel=false, error=Error
   */
  createMessageChannelForReadableStream(readable: ReadableStream) {
    this.readable = readable
    this.log('createMessageChannelFromStream', readable)
    const reader: ReadableStreamReader = readable.getReader()
    const messageChannel: MessageChannel = new MessageChannel()
    const port = messageChannel.port1
    const reply = (message: any) => port.postMessage(message)
    port.onmessage = (event: MessageEvent) => {
      this.log('got message on port1', event)
      if (event.data === true) { // pull
        this.log('reading', readable)
        reader.read().then(
          ({ value, done }) => {
            if (done) {
              this.log('stream done')
              reply(null) // done
            } else {
              this.log('stream chunk', value)
              reply(value) // chunk
            }
          },
          (error: Error) => reply(error)
        );
      } else if (event.data === null) {
        this.log('stream close ack', event.data)
      } else if (event.data === false) {
        this.log('stream cancelled', event.data)
        readable.cancel()
      } else if (event.data instanceof Error) {
        this.log('stream error', event.data)
        readable.cancel() // todo
      }
    }
    return messageChannel
  }

}

if (typeof window === 'object') {
  Object.assign(window, { ReadableStreamMessageChannel })
}