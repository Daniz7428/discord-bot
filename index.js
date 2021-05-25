const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const firstMessage = require('./first-message')
const command = require('./command')
client.on('ready', () => {
	console.log('Ta ready pibe')

	firstMessage(client, '845296583880212500', 'buenos dias', ['🔥'])

	command(client, 'caca', message => {
		message.channel.send('cacota')
	})
	command(client, 'servers', message =>{
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} tiene un total de ${guild.memberCount} miembros`
			)
		})
	})

	command(client, ['cc', 'clearchannel'], message =>{
		if (message.member.hasPermission('ADMINISTRATOR')){
			message.channel.messages.fetch().then(results => {
				message.channel.bulkDelete(results)
			})
		}
	})

	command(client, 'estado', message => {
		const content = message.content.replace('{estado ', '')
		client.user.setPresence({
			activity: {
				name: content,
				type: 0
			},
		})	
	})

})
client.login(config.token)




//https://www.youtube.com/watch?v=bAnmI4mwGcs&list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe&index=2
