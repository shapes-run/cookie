import fs from 'node:fs'
import path from 'node:path'
import type { Command } from '@types'
import { type Client, REST, Routes } from 'discord.js'

const token = import.meta.env.TOKEN as string
const clientId = import.meta.env.CLIENT_ID as string
const guildId = import.meta.env.GUILD_ID as string

export const deployCommands = async (client: Client) => {
  const commands = []

  const commandsPath = path.join(__dirname, '..', 'commands')
  const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'))

  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command: Command = require(filePath).default

    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
  }

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )
    const rest = new REST().setToken(token)
    const data = (await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    )) as []

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
}
