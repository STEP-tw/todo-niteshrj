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
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /login.html',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
  })
  describe('GET /logout.html',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login.html');
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
        th.should_be_redirected_to(res,'/login.html');
        done();
      })
    })
  })
  describe('POST /addTodoData if loged in',()=>{
    it('redirects to createTodo page',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'POST',url:'/addTodoData',
                headers: {cookie:`sessionid=${sessionid}`},body:'title=milk&desc=buyMilk&todoList=gotoshop'},res=>{
          th.should_be_redirected_to(res,'/createTodo.html');
        })
        done();
      })
    })
  })
  describe('GET /createTodo.html',()=>{
    it('gives the createTodo page if logedin',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/createTodo.html',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.status_is_ok(res);
          th.content_type_is(res,'text/html');
        })
        done();
      })
    })
    it('gives the login page if not logedin',done=>{
        request(app,{method:'GET',url:'/createTodo.html'},res=>{
          th.should_be_redirected_to(res,'/login.html');
        })
        done();
    })
  })
  describe('GET /viewTodo.html',()=>{
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
  describe('GET /login.html',()=>{
    it('redirects to home page if logedin',done=>{
      request(app,{method:'POST',url:'/login',body:'username=alok'},res=>{
        let sessionid=getSessionId(res);
        request(app,{method:'GET',url:'/login.html',
                headers: {cookie:`sessionid=${sessionid}`}},res=>{
          th.should_be_redirected_to(res,'/home');
        })
      })
      done();
    })
  })
})
