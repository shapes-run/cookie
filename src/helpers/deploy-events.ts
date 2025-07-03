import fs from 'node:fs'
import path from 'node:path'
import type { Listener } from '@types'
import type { Client } from 'discord.js'

export const deployEvents = (client: Client) => {
  const eventsPath = path.join(__dirname, '..', 'events')
  const eventsFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts'))

  for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file)
    const event: Listener = require(filePath).default

    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args))
  }
}
