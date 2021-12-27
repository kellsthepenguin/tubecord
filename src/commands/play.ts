import { Message, MessageEmbed } from 'discord.js'

import Client from '../classes/Client.js'
import Query from '../classes/Query.js'
import Queue from '../classes/Queue.js'
import { getYoutubeVideoInfo, isYoutubeIdValid } from '../utils/index.js'

export default async function (client: Client, msg: Message, { args }: Query) {
  if (args.length < 1) return msg.reply('인수가 부족합니다.')
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
    msg.reply(':white_check_mark: 큐에 추가했어요!')
    msg.channel.send(embed)
  } else {
    msg.reply(':x: 비디오 ID가 올바르지 않아요. 올바른 예: `t!play dQw4w9WgXcQ`')
  }
}

export const aliases = ['play', 'add']
