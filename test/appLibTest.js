const appLib = require('../appLib');
const assert = require('chai').assert;


describe('appLib',()=>{
  describe('urlExist',()=>{
    it('returns true for a file that exists in public',done=>{
        assert.ok(appLib.urlExist('home.html'));
        done();
    })
    it('returns false for a file that does not exist in public',done=>{
        assert.notOk(appLib.urlExist('meraHome.html'));
        done();
    })
  })
  describe('contentType',()=>{
    it('returns text/html content type for home.html',done=>{
      assert.equal(appLib.contentType('home.html'),"text/html");
      done();
    })
    it('returns text/pdf content type for image.pdf',done=>{
      assert.equal(appLib.contentType('image.pdf'),"text/pdf");
      done();
    })
    it('returns text/css content type for home.css',done=>{
      assert.equal(appLib.contentType('home.css'),"text/css");
      done();
    })
    it('returns text/js content type for home.js',done=>{
      assert.equal(appLib.contentType('home.js'),"text/js");
      done();
    })
    it('returns image/PNG content type for home.PNG',done=>{
      assert.equal(appLib.contentType('home.PNG'),"image/PNG");
      done();
    })
    it('returns image/jpeg content type for home.jpeg',done=>{
      assert.equal(appLib.contentType('home.jpeg'),"image/jpeg");
      done();
    })
    it('returns image/gif content type for home.gif',done=>{
      assert.equal(appLib.contentType('home.gif'),"image/gif");
      done();
    })
  })
})
