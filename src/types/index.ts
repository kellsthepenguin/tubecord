import { Message } from 'discord.js'

import Query from '../classes/Query'
import Client from '../classes/Client'

export interface Config {
  prefix: string
  token: string
  [key: string]: string
}

export interface Command {
  default: (client: Client, msg: Message, query: Query) => any,
  aliases: string[]
}

export interface VideoInfo {
  title: string
  author_name: string
  author_url: string
  thumbnail_url: string
}

export interface Music {
  requester: string
  videoId: string
  info: VideoInfo
}
