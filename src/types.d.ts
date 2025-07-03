import type {
  ChatInputCommandInteraction,
  Client,
  Events,
  SlashCommandBuilder
} from 'discord.js'

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction, client: Client) => void
}

export interface Listener {
  name: Events | string
  once?: boolean
  execute: (...args) => void
}
