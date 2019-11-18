import ReadableStreamMessageChannel from './ReadableStreamMessageChannel'
import EventReadableStream from './EventReadableStream'

const debug = require('debug')('PostMessageTransferableStream')

interface ReadableMessageEvent extends MessageEvent {
  readable: ReadableStream
}

/**
 * Allow streams in PostMessage payloads
 * @note The payload top level object must stream to trigger stream transfer
 */
export default class PostMessageTransferableStream {

  target: any
  log: Function = debug

  constructor(target: any) {
    this.target = target || window
    if (!('postMessage' in this.target)) {
      throw new TypeError('Target does not support postMessage')
    }
    this.log('created PostMessageTarget')
  }

  postMessage(message: any, ...extra: Array<any>) {
    this.log('postMessage', message, extra)
    if (message instanceof ReadableStream || message instanceof WritableStream) {
      this.log('post stream Message to ', this.target, message)
      return this.postStreamMessage(message)
    }
    return this.target.postMessage(message, ...extra)
  }

  postStreamMessage(stream:ReadableStream|WritableStream) {
    this.log('createStreamMessage')
    const channel = (stream instanceof ReadableStream)
      ? this.createMessageChannelForReadableStream(stream)
      : null // todo
    const port = channel.port2
    return this.target.postMessage(
      { 'PostMessageTransferableStream': stream.constructor.name, port  }, 
      '*', 
      [port]
    )
  }

  addEventListener(eventName: string, cb: Function, ...extra: Array<any>) {
    this.log('addEventListener', eventName, extra)
    return this.target.addEventListener(eventName, (event:ReadableMessageEvent) => {
      if (event.data && event.data.PostMessageTransferableStream) {
        const readable = this.createReadableStreamFromEvent(event)
        cb({ ...event, data: readable })
      } else {
        cb(event)
      }
    }, ...extra)
  }

  /**
   * Message channel: pull=true, cancel=false, error=Error 
   */
  createMessageChannelForReadableStream(stream: ReadableStream) {
    this.log('creatingMessageChannel', stream)
    return (new ReadableStreamMessageChannel(stream)).messageChannel
  }

  createReadableStreamFromEvent(event: ReadableMessageEvent) {
    this.log('createReadableStream', event)
    if (event.readable) return event.readable
    event.readable = (new EventReadableStream(event)).readable
    return event.readable
  }

}