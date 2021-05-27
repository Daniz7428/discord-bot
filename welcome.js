
module.exports = (client) => {
  const channelId = '839043103007440918' // welcome channel
  const targetChannelId = '847038654593761281' // roles

  client.on('guildMemberAdd', (member) => {
    const message = `Bienvenido <@${
      member.id
    }> , porfavor para reclamar un rol ve a ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
  })
}