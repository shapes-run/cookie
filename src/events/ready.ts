import type { Listener } from '@types'
import { type Client, Events } from 'discord.js'

const ReadyEvent: Listener = {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Logged in as ${client.user?.tag}!`)
  }
}

export default ReadyEvent
