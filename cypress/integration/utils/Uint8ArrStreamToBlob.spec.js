const Uint8ArrStreamToBlob = require('../../../src/utils/Uint8ArrStreamToBlob')
const baseUrl = 'http://localhost:9000'

function getStreamContents(stream) {
  const reader = stream.getReader()
  const data = []
  return new Promise(resolve => {
    const readChunk = async () => {
      const { value, done } = await reader.read()
      if (done) return resolve(data)
      data.push(value)
      readChunk()
    }
    readChunk()
  })
  .then(arr => new Blob(arr, { type: 'application/octet-stream'}))
}

context('Uint8ArrStreamToBlob', () => {

  beforeEach(() => {
    cy.visit(baseUrl + '/')
  })

  it('Stream content equivalent to blob contents', async () => {
    const imgStream = await fetch(baseUrl + '/image/seedess-goddess-low-res.jpg')
      .then(res => res.body)
    cy.log('imgStream type', typeof imgStream)
    const [ imgStream1, imgStream2 ] = imgStream.tee()
    const imgBlob = await Uint8ArrStreamToBlob(imgStream1)
    const imgContentsArr = await getStreamContents(imgStream2)
    expect(imgStream1).to.be.instanceOf(ReadableStream)
    expect(imgBlob).to.be.instanceOf(Blob)
    cy.log('contents', imgContentsArr)
    console.log('image contents array', imgContentsArr)
  })

})