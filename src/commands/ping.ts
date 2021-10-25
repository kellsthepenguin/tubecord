import { Message } from 'discord.js'
import Client from '../classes/Client.js'

export default function (client: Client, msg: Message) {
  msg.channel.send(':ping_pong: Pong! **' + client.ws.ping + 'ms**')
}

export const aliases = ['ping', '핑', 'pong']
