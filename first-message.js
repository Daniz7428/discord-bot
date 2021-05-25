module.exports = async(client, id, text, reactions = []) => {
	const channel = await client.channel.fetch(id)

	channel.messages
}