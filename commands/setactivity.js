module.exports.run = async (bot, message, args) => {
	let guild = bot.guilds.find("id", "410400562232819723");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member.roles.get("410481036162760722")) {
		let tbh = args.join(" ")
			.toUpperCase();
		bot.user.setActivity(`${bot.user.presence.game.name}`, {
			type: `${tbh}`
		});
		message.react("\u2705");
	}
};
module.exports.help = {
	name: "setactivity",
	description: "Sets the activity for the bot",
	type: "Restricted"
};
