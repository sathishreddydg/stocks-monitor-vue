const path = require('path')
const express = require('express')
const secure = require('express-force-https')
const historyApiFallback = require('connect-history-api-fallback')

const app = express()
const staticPath = path.posix.join('/')

app.use(secure) // Force https instead http
app.use(historyApiFallback())
app.use(staticPath, express.static(path.join(__dirname, '/dist')))

app.get('/*/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const PORT = process.env.PORT || 8081
app.listen(PORT)

console.log('server listening on port : ' + PORT)
