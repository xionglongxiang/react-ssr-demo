
const express = require('express')
const puppeteer = require('puppeteer')
// /api开头的
const axios = require('axios')
const app = express()

// 作业：使用next.js+antd+redux实现类似https://e.xitu.io/
// 1. 查看网页使用的接口(用掘金的接口即可)
// 2. 左侧掘金热文，右侧github trending
// 3. 支持切换（不用那么多，又功能就行）

async function test(){
  console.log('截图')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://kaikeba.com/')
  await page.screenshot({path:'kaikeba.png'})
  await browser.close()
}
// test()
const urlCache = {}
app.get('*', async function(req,res){
  console.log(req.url)
  // 遍历所有的路由，都写成html文件，或者都缓存上
  // 1. 加缓存
  // 2. lru缓存算法
  if(urlCache[url]){
    return res.send(urlCache[url])
  }
  if(req.url=='/favicon.ico'){
    // 对seo无影响
    return res.send({code:0})
  }
  const url = 'http://localhost:9093'+req.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url,{
    waitUntil:['networkidle0']
  })
  const html = await page.content()
  console.log(html)
  urlCache[url] = html
  res.send(html)
})
app.listen(8081,()=>{
  console.log('ssr server start')
})