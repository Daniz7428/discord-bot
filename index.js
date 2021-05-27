const Discord = require('discord.js')
const client = new Discord.Client()

//archivos
require('events').EventEmitter.defaultMaxListeners = Infinity; 
const config = require('./config.json')
const roleClaim = require('./role-claim')
const memberCount = require('./member-count')
const poll = require('./polls')
const welcome	= require('./welcome')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const command = require('./command')

//comandos
client.on('ready', () => {
	console.log('Ta ready pibe')
 	
	 //comandos en archivos aparte
	memberCount(client)
	roleClaim(client)

	//estado
	const { prefix } = config

	client.user.setPresence({
		activity: {
			name: `"${prefix}help" para ayuda`
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

	//Ban & kick

	command(client, 'ban', (message) => {
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMIN') || 
		member.hasPermission('BAN_MEMBERS')){ 
			const target = mentions.users.first()
		
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)
				targetMember.kick()
				message.channel.send(`${tag} El usuario ha sido banneado`)
			}
			else{
				message.channel.send(`${tag} Porfavor, indica a algun usuario`)
			}
		}
		else {
			message.channel.send(`${tag} No tienes permisos para usar este comando`)
		}
	})

		command(client, 'kick', (message) => {
		const { member, mentions } = message

		const tag = `<@${member.id}>`

		if(member.hasPermission('ADMIN') || 
		member.hasPermission('KICK_MEMBERS')){ 
			const target = mentions.users.first()
		
			if(target){
				const targetMember = message.guild.members.cache.get(target.id)
				targetMember.ban()
				message.channel.send(`${tag} El usuario ha sido expulsado`)
			}
			else{
				message.channel.send(`${tag} Porfavor, indica a algun usuario`)
			}
		}
		else {
			message.channel.send(`${tag} No tienes permisos para usar este comando`)
		}
	})

	//ayuda e informacion

	command(client, 'help', (message) => {
		message.channel.send(`
		Estos son los comandos de este bot:

		**{help** - ayuda sobre el servidor
		**{cc** - borra el contenido del canal en el que se escribe
		**{cvc <nombre>** - Crea un canal de voz
		**{ctc <nombre>** - Crea un canal de texto
		**{serverinfo** - Muestra informacion del servidor
		**{estado <contenido>** - Cambia el estado del bot
		**{ban <@usuario>** Bannea a una persona del servidor
		**{kick <@usuario>** Expulsado a una persona del servidor
		`)
	})


	command(client, 'serverinfo', (message) => {
		const { guild } = message
	
		const { name, region, memberCount, owner, afkTimeout} = guild
		const icon = guild.iconURL()

		const embed = new Discord.MessageEmbed()
			.setTitle(`Server info for "${name}"`)
			.setThumbnail(icon)
			.addFields({
				name: 'Region',
				value: region,
			},
			{
				name: 'Members',
				value: memberCount,
			},
			{
				name: 'Owner',
				value: owner.user.tag,
			},
			{
				name: 'AFK Timeout',
				value: afkTimeout / 60,
			},)

		message.channel.send(embed)
	})


	//Herramientas para canales

	command(client, 'ctc', (message) => {
		const name = message.content.replace('{ctc ', '')


		message.guild.channels
		.create(name, {
			type: 'text'
		}).then(channel => {
			const categoryId = '846999104134316073'
			channel.setParent(categoryId)
		})
	})

	command(client, 'cvc', (message) => {
		const name = message.content.replace('{cvc ', '')

		message.guild.channels
		.create(name, {
			type: "voice"
		})
		.then((channel) => {
			channel.setUserLimit(10)
			const categoryId = '846999104134316073'
			channel.setParent(categoryId)
		})
	})


	command(client, ['cc', 'clearchannel'], message =>{
		if (message.member.hasPermission('ADMINISTRATOR')){
			message.channel.messages.fetch().then(results => {
				message.channel.bulkDelete(results)
			})
		}
	})


})
client.login(config.token)




//https://www.youtube.com/watch?v=bAnmI4mwGcs&list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe&index=2
