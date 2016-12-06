import Koa from 'koa'
import tmpl from 'riot-tmpl'
import serve from 'koa-static'
import path from 'path'
import fs from 'fs-promise'

const publicFiles =serve(path.join(__dirname, '../public'))
publicFiles._name = 'static /public'

const app = new Koa()

function logger(format) {
  format = format || ':method ":url"';

  return async function (ctx, next) {
    const str = format
      .replace(':method', ctx.method)
      .replace(':url', ctx.url);

    console.log(str);

    await next();
  };
}

app.use(logger())

app.use(async(ctx,next)=>{
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(publicFiles)

app.use(async(ctx,next) => {
  if(ctx.path == '/'){
    ctx.body = '<h1> hello koa </h1>'
  }else{
    await next()
  }
});

console.log('koa started: http://localhost:3000')
app.listen(3000)