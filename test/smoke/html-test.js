const mocha = require(mocha);
const glob = require('glob-all');

describe('test html file', () => {
  it('should generate html file', (done) => {
    const files = glob.sync([
       './dist/index.html',
       './dist/search.html'
    ]);
    if (files.length > 0) {
        done();
    } else {
        throw new Error('no html visible')
    }
  })
})
