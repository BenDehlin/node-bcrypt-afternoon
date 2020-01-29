require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const auth = require('./middleware/authMiddleware')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET
}))
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log("db connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))

//ENDPOINTS
//user auth
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

//treasure
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)