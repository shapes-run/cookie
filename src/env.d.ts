import type { Command } from '@types'
import type { Collection } from 'discord.js'

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>
  }
}
