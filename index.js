const express = require('express')
const app = express()
var uuid = require('uuid4');
console.log(uuid())

app.use('/', express.static('index'))

async function tpLink(action) {
  let myTPLink = await tplink.login(process.env.email, process.env.pass, 'cbc226af-8fd2-4fd5-8dc0-cade434dd226')
}
app.get('/on', (req, res) => {

})
app.get('/off', (req, res) => {

})


app.listen(3000, () => console.log('Example app listening on port 3000!'))