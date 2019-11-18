# PostMessage Transferable Steam

Allow transfering streams in Browser PostMessage

Still in the works, transferable streams standard will allow transfer of streams in postMessage() interfaces. 

Transferable Streams - https://github.com/whatwg/streams/blob/master/transferable-streams-explainer.md

This library wraps postMessage so that it can transfer streams. The wrapping does not effect the underlying postMessage. 


## Why?

* Simplify transfer of streamable data between postMessage contexts.
* Closer to upcoming implementation to avoid much redesigning later. 

## Examples

Modified from https://github.com/whatwg/streams/blob/master/transferable-streams-explainer.md

In the browser page:

```
import Transferable from 'PostMessageTransferableStream'

const rs = new ReadableStream({
  start(controller) {
    controller.enqueue('hello');
  }
});
const worker = new Worker('worker.js');
const transferrable = new Transferable(worker);
transferrable.postMessage(rs, [rs]);

```

In worker.js 

```
import Transferable from 'PostMessageTransferableStream'

const transferrable = Transferable(self);
transferrable.addEventListener('message', async (evt) => {
  const rs = evt.data;
  const reader = rs.getReader();
  const {value, done} = await reader.read();
  console.log(value); // logs 'hello'.
})
```

## Getting started

### Use npm

```bash
npm install postmessage-transferable-stream
```

See examples.

## How to run tests and examples

* tests

    ```bash
    npm run test
    ```

* production

    ```bash
    npm run build
    ```

* example

    ```bash
    npm run example
    ```

## License

&copy; [Seedess](https://seedess.com) - [The MIT License](https://seedess.mit-license.org/) @ 2019
