import { Message } from 'discord.js'

import Client from '../classes/Client.js'
import Query from '../classes/Query.js'
import { isYoutubeIdValid } from '../utils/index.js'

export default async function (client: Client, msg: Message, { args }: Query) {
  if (args.length < 1) msg.reply('more args required')
  const { guild } = msg
  const queue = client.queues.get(guild!.id)
  const [videoId] = args

  if (await isYoutubeIdValid(videoId)) {
    queue?.playlist.push({
      requester: msg.author.id,
      videoId
    })
    msg.reply('added to queue')
  } else {
    msg.reply('youtube id is not valid')
  }
}

export const aliases = ['play', 'add']
