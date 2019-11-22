const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const { connectionStr } = require('./config/baseConfig')

const app = express()

mongoose.connect(connectionStr,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
).then(() => {
  logger.info('MongoDB connect success!')
  console.log('MongoDB connect success!')
}).catch(error => {
  logger.error(error)
  console.error(JSON.stringify(error, null, 4))
})


app.use(express.static(path.join(__dirname, 'public')))

//TODO：错误处理
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'dev') {
  app.set('showStackError', true)
  app.use(morgan(`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]`))
  app.locals.pretty = true
  mongoose.set('debug', true)
  app.use(errorHandler({
    log:(err, str, req)=>{
      console.log(err)
      logger.error(err)
    }
  }))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//TODO：参数校验

app.get('/test',(req,res)=>{
  res.json({a})
})
app.listen(3000, () => {console.log(`server is listening 3000`)})

module.exports = app
