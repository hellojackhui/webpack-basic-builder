const mocha = require(mocha);
const glob = require('glob-all');

describe('test css file', () => {
  it('should generate css file', (done) => {
    const files = glob.sync([
       './dist/index.css',
       './dist/search.css'
    ]);
    if (files.length > 0) {
        done();
    } else {
        throw new Error('no css visible')
    }
  })
})
