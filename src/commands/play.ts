import { Message, MessageEmbed } from 'discord.js'

import Client from '../classes/Client.js'
import Query from '../classes/Query.js'
import Queue from '../classes/Queue.js'
import { getYoutubeVideoInfo, isYoutubeIdValid } from '../utils/index.js'

export default async function (client: Client, msg: Message, { args }: Query) {
  if (args.length < 1) return msg.reply('more args required')
  const { guild } = msg
  let queue = client.queues.get(guild!.id)
  const [videoId] = args

  if (!queue) {
    client.queues.set(guild!.id, new Queue())
    queue = client.queues.get(guild!.id)
  }

  if (await isYoutubeIdValid(videoId)) {
    const music = {
      requester: msg.author.id,
      videoId,
      info: await getYoutubeVideoInfo(videoId)
    }

    queue?.playlist.push(music)
    const embed = new MessageEmbed({
      title: music.info.title,
      thumbnail: { url: music.info.thumbnail_url }
    })
    msg.reply('added to queue')
    msg.channel.send(embed)
  } else {
    msg.reply('youtube id is not valid')
  }
}

export const aliases = ['play', 'add']
