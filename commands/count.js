module.exports.run = async (bot, message) => {
	message.reply(`${bot.guilds.size} servers!!`);
};
module.exports.help = {
	name: "count",
	aliases: ["servers"],
	description: "Sends you the number of servers I am in",
	type: "Information"
};
