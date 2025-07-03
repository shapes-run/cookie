import { deployCommands } from '@helpers/deploy-commands'
import { deployEvents } from '@helpers/deploy-events'
import { Client, Collection, GatewayIntentBits } from 'discord.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

client.commands = new Collection()
deployCommands(client)
deployEvents(client)

client.login(import.meta.env.TOKEN)
