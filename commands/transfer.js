module.exports.run = (bot, message, args) => {
	if (!args[1]) return message.reply("Invalid usage: `!transfer @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (!message.mentions.members.first()) return message.reply("Invalid usage: `!transfer @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	var transferAmount = Number(args[1]);
	var transferTo = message.mentions.members.first();
	if (transferTo.id === message.author.id) return message.reply("Ha, no.").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (transferTo.user.bot) return message.reply("No bots!").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (!transferAmount) return message.reply("Transfer amount must be a number! `!transfer @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (transferAmount <= 0) return message.reply("Transfer amount must be greater than 0").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (bot.getCoins(message.author) < transferAmount) return message.reply("You do not have enough coins to do this!").catch(() => {
		message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	bot.changeCoins(message.author, -transferAmount).then(() => {
		bot.changeCoins(transferTo.user, transferAmount).then(() => {
			message.reply(`Transferred ${transferAmount} w coins to ${transferTo.user.tag}`).catch(() => {
				message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		}).catch(() => {
			bot.changeCoins(message.author, transferAmount);
			message.reply("Couldn't transfer coins, returned back your coins").catch(() => {
				message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}).catch(() => {
		message.reply("Couldn't transfer coins").catch(() => {
			message.author.send(`You attempted to use the \`transfer\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	});
};
module.exports.help = {
	name: "transfer",
	description: "Transfers w coins to someone else",
	type: "Currency",
};
