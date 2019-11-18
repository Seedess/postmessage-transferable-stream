const Uint8ArrStreamToBlob = require('../../../src/utils/Uint8ArrStreamToBlob').default
const StreamToUint8Array = require('../../../src/utils/StreamToUint8Array').default

const baseUrl = 'http://localhost:9000'

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
    const imgBlob2 = await Uint8ArrStreamToBlob(imgBlob.stream())
    expect(imgStream1).to.be.instanceOf(ReadableStream)
    expect(imgBlob).to.be.instanceOf(Blob)
    expect(imgBlob2).to.be.instanceOf(Blob)
    expect(imgBlob).to.not.deep.equal(new Blob([]))
    expect(imgBlob).to.deep.equal(imgBlob2)
    const arr1 = await StreamToUint8Array(imgStream2)
    const arr2 = await StreamToUint8Array(imgBlob2.stream())
    console.log('arr', new Blob(arr1), new Blob(arr2))
  })

})