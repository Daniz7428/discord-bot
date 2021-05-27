module.exports = (client) => {
	const channelId = '847372543954124800'

	const updateMembers = (guild) => {
		const channel = guild.channels.cache.get(channelId)
		channel.setName(`Miembros: ${guild.memberCount.toLocaleString()}`)
	}

	client.on('guildMemberAdd', (member) => updateMembers(member.guild))
	client.on('guildMemberRemove', (member) => updateMembers(member.guild))

	const guild = client.guilds.cache.get('839042347928125480')
	updateMembers(guild) 
}