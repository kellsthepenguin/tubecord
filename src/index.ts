import Client from './classes/Client.js'
import onReady from './events/onReady.js'
import onMessage from './events/onMessage.js'

const client = new Client()

client.start()
client.regist('ready', onReady)
client.regist('message', onMessage)
