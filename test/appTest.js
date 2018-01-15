let assert = require('chai').assert;
let request = require('./requestSimulator.js');
let th = require('./testHelper.js');
let app = require('./../app.js');

const getSessionId = function(res){
  return res['headers']['Set-Cookie'].split("=")[1];
}

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('serve login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
  })
  describe('GET /logout',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'username=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('POST /addTodoData',()=>{
    it('redirects to createTodo page',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'POST',url:'/addTodoData',
                headers: {cookie:`sessionid=${sessionid}`},body:'title=milk&desc=buyMilk&todoList=gotoshop'},res=>{
          th.should_be_redirected_to(res,'/writeItems');
        })
        done();
      })
    })
  })
  describe('POST /addItems',()=>{
    it('redirects to createTodo page',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'POST',url:'/addItems',
                headers: {cookie:`sessionid=${sessionid}`},body:'title=milk&item=buyMilk'},res=>{
          th.should_be_redirected_to(res,'/writeItems');
        })
        done();
      })
    })
  })
  describe('GET /createTodo',()=>{
    it('gives the createTodo page if logedin',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/createTodo',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/html');
        })
        done();
      })
    })
    it('gives the login page if not logedin',done=>{
        request(app,{method:'GET',url:'/createTodo'},res=>{
          th.should_be_redirected_to(res,'/login');
        })
        done();
    })
  })
  describe('GET /writeItems',()=>{
    it('gives the login page',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/writeItems',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/html');
        })
        done();
      })
    })
  })
  describe('GET /viewTodo',()=>{
    it('gives the viewTodo page if logedin',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/viewTodo.html',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/html');
        })
      })
      done();
    })
  })
  describe('GET /login',()=>{
    it('redirects to home page if logedin',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/login',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.should_be_redirected_to(res,'/home');
        })
      })
      done();
    })
  })
})
