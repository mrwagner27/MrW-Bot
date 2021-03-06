const Discord = require("discord.js");
module.exports.run = async (bot, message) => {
	let target = message.guild.member(message.mentions.users.first());
	if (target) {
		if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS")) {
			var dbguild = bot.guilds.get("443929284411654144");
			var dbchannels = dbguild.channels.filter((m) => RegExp("warn-database", "gi").test(m.name));
			var warns = [];
			var warningnum = 0;
			var channelloop = 0;
			var messageloop = 0;
			for (let dbchannel of dbchannels.array()) {
				dbchannel.fetchMessages({
					limit: 100
				}).then((messages) => {
					for (let msg of messages.array()) {
						if (msg.content.startsWith(`${message.guild.id} ${target.id}`)) {
							warningnum = warningnum + 1;
							warns.push(`${dbchannel.id} ${msg.id}`);
						}
						messageloop = messageloop + 1;
						if (messageloop == messages.size) {
							messageloop = 0;
							channelloop = channelloop + 1;
							if (channelloop == dbchannels.size) {
								if (warningnum == 0) return message.reply("There are no warnings on this user!");
								var count = 1;
								message.reply(`Removed warn ${count}/${warningnum} for \`${target.user.tag}\`.`).then((m) => {
									for (let warn of warns) {
										dbguild.channels.get(warn.substr(0, 18)).fetchMessage(warn.substr(19)).then((wm) => {
											wm.delete();
											if (count == warningnum) return m.edit(`${message.author}, Removed all warnings (${warningnum}) from \`${target.user.tag}\``);
											m.edit(`${message.author}, Removed warn ${count}/${warningnum} \`${target.user.tag}\``);
											count = count + 1;
										}).catch(function() {});
									}
								}).catch(function() {});
							}
						}
					}
				}).catch(function() {});
			}
		} else {
			message.reply("Insufficent permissions.");
		}
	} else {
		message.reply("Please **mention** a valid user.");
	}
	var logsDatabase = bot.channels.get("443931379907166210");
	logsDatabase.fetchMessages({ limit: 100 }).then((logmessages) => {
		for (let msg of logmessages.array()) {
			var logChannel = bot.channels.get(msg.content.split(" ")[1]);
			if (logChannel == undefined) return msg.delete();
			var logGuild = logChannel.guild;
			if (logGuild == undefined) return msg.delete();
			if (`${logGuild.id}` === `${message.guild.id}`) {
				const clearwarnEmbed = new Discord.RichEmbed()
					.setTitle("Cleared Warns")
					.setColor("RED")
					.addField("Clear Information", `Member Cleared ID: \`${target.id}\`\nMember Cleared: ${target}\nCleared At: \`${new Date(Date.now())}\`\nModerator: ${message.author}`);
				logChannel.send({ embed: clearwarnEmbed }).catch(function() {});
			}
		}
	}).catch(function() {});
};
module.exports.help = {
	name: "clearwarn",
	description: "Clears warnings for a user",
	type: "Moderation"
};
