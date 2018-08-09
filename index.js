require('dotenv').config()
const express = require('express')
const app = express()
var uuid = require('uuid4');
const tplink = require('tplink-cloud-api')
console.log(uuid())

app.use('/', express.static('page'))

async function tpLink(action) {
  let myTPLink = await tplink.login(process.env.email, process.env.pass, 'cbc226af-8fd2-4fd5-8dc0-cade434dd226')
  let deviceList = await myTPLink.getDeviceList()
  if (action == 'on') await myTPLink.getLB100("Lampy").transition_light_state(1, 100)
  else await myTPLink.getLB100("Lampy").transition_light_state(0, 0)
}
app.get('/on', (req, res) => {
  console.log(req)
  tpLink('on')
})
app.get('/off', (req, res) => {
  console.log(req)
  tpLink('off')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))