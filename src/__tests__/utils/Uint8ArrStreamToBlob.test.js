const Uint8ArrStreamToBlob = require('../../utils/Uint8ArrStreamToBlob').default
const baseUrl = 'http://localhost:9000'

const fetch = () => {
  const fileReader = new BiquadFilterNode
  return new Response(stream, { headers: [ 'Content-type', 'image/jpg' ] })
}


describe('Uint8ArrStreamToBlob', () => {

  test('Stream content equivalent to blob contents', async () => {
    const imgStream = await fetch(baseUrl + '/image/seedess-goddess-low-res.jpg')
      .then(res => res.body)
    console.log('stream', imgStream.constructor)
    const imgBlob = await Uint8ArrStreamToBlob(imgStream)
    expect(imgBlob).toBeInstanceOf(ReadableStream)
  })

})