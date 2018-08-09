require('dotenv').config()
const express = require('express')
const app = express()
const tplink = require('tplink-cloud-api')
const compression = require('compression')
const winston = require('winston')
console.log(process.env.NODE_ENV)

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use(compression())


app.use('/', express.static('page'))

async function tpLink(action) {
  let myTPLink = await tplink.login(process.env.email, process.env.pass, 'cbc226af-8fd2-4fd5-8dc0-cade434dd226')
  let deviceList = await myTPLink.getDeviceList()
  if (action == 'on') await myTPLink.getLB100("Lampy").transition_light_state(1, 100)
  else await myTPLink.getLB100("Lampy").transition_light_state(0, 0)
}
app.get('/on', (req, res) => {
  logger.info(JSON.stringify(req.headers))
  tpLink('on')
})
app.get('/off', (req, res) => {
  logger.info(JSON.stringify(req.headers))
  tpLink('off')
})

app.listen(3000, () => console.log('Started.'))