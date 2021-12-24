import path from 'path'
import { existsSync, readFileSync } from 'fs'
import { Client } from 'discord.js'
import { readRecursively } from '../utils/index.js'
import { Command, Config } from '../types/index.js'
import Queue from './Queue.js'

const PATH = path.resolve()

export default class extends Client {
  public config: Config
  public commands: Command[] = []
  public queues = new Map<string, Queue>()

  constructor () {
    super()

    const configPath = PATH + '/config.json'

    const isConfigExists = existsSync(configPath)

    if (isConfigExists) {
      const configRaw = readFileSync(configPath).toString('utf-8')
      const config = JSON.parse(configRaw)

      this.config = {
        token: config.token || process.env.TOKEN || '',
        prefix: config.prefix || process.env.PREFIX || 't!'
      }
    } else {
      this.config = {
        token: process.env.TOKEN || '',
        prefix: process.env.PREFIX || 't!'
      }
    }

    if (this.config.token.length < 1) throw new Error('TOKEN not provided')

    this.initCommands()
  }

  async initCommands () {
    const commandPath = PATH + '/dist/commands'
    const isCommandExists = existsSync(commandPath)

    if (isCommandExists) {
      const files = readRecursively(commandPath)
      for (const file of files) {
        if (!file.endsWith('.js')) continue
        this.commands.push(await import(file) as Command)
      }
    }
  }
  public start = (token?: string) => this.login(token || this.config.token)
  public regist = (event = 'ready', exec: any) =>
    this.on(event, (...args) => exec(this, ...args))
}
