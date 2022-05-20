const Koa = require('koa')
const os = require('os')
const app = new Koa()
const path = require("path")
const bodyParser = require('koa-bodyparser')

// app.use(bodyParser())
const router = require('koa-router')()

app.use(require('koa-static')(__dirname + './../html/'))

// 获取创建订单的自定义模块
const createOrder = require(path.join(__dirname, './createOrder.js')).createOrder;
const precreate = require(path.join(__dirname, './precreate.js'));
router.get('/zhifu', async (ctx, next) => {
  console.log("进来1");
    console.log('body', ctx.request.body);
   let p = {
    cost:"0.01",
    goodsName:"可乐001",
    pack_params: {
      payName:"测试",
      goodsName:"可乐001",
      price: "0.01",
      count: 1,
      cost: "0.01",
  }
   }
    let res =await  createOrder(p);
    console.log(res);
    ctx.body = res
    next()
})
router.get('/zhifu1', async (ctx, next) => {
  console.log("进来2");
   let p = {
    cost:"0.01",
    goodsName:"可乐001",
    pack_params: {
      payName:"测试",
      goodsName:"可乐001",
      price: "0.01",
      count: 1,
      cost: "0.01",
  }
   }
    let res =await  precreate(p);
    console.log(res);
    ctx.body = res
    next()
})

app.use(router.routes())


app.listen(80,()=>{
  const myHost = getIPAdress();

  console.log(`http://${myHost}`);
})


function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
      var iface = interfaces["WLAN"];
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }
  }
}
