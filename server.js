const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const secure = require('express-force-https')
const history = require('connect-history-api-fallback')
const Firestore = require('@google-cloud/firestore')

const db = new Firestore()
const app = express()
const staticFileMiddleware = express.static(path.join(__dirname, '/dist'))

app.use(secure) // Force https instead http
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})) // support encoded bodies

app.get('/watchlists/:id', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  db.collection('stocks-monitor-users').doc(req.params.id).get().then(doc => {
    if (!doc.exists) { res.sendStatus(404) }
    res.send(doc.data())
  }).catch((err) => {
    res.sendStatus(500)
    console.log('Error getting documents', err)
  })
})

app.post('/watchlists/:id', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log(req.body)
  try {
    db.collection('stocks-monitor-users').doc(req.params.id).set(req.body)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

// <<<<<<<<<<<<<-- use connect-history-api-fallback after the express() app routes -->>>>>>>>>>>>>>
app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)
// ^ `app.use(staticFileMiddleware)` is included twice as per
// https://github.com/bripkens/connect-history-api-fallback/blob/master/examples/static-files-and-index-rewrite/README.md#configuring-the-middleware

app.get('/', function (req, res) {
  res.render(path.join(__dirname, '/index.html'))
})
const PORT = process.env.PORT || 8083
app.listen(PORT)

console.log('Server running at http://localhost:' + PORT)
