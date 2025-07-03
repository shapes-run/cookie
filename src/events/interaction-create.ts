import type { Listener } from '@types'
import {
  type BaseInteraction,
  type Client,
  Events,
  MessageFlags
} from 'discord.js'

const InteractionCreate: Listener = {
  name: Events.InteractionCreate,
  execute: async (
    interaction: BaseInteraction,
    client: Client
  ): Promise<void> => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction, client)
    } catch (error) {
      console.error(error)

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral
        })
      }
    }
  }
}

export default InteractionCreate
