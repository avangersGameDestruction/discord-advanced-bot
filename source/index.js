import "discord.js";
const client = new Discord.Client();


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity("!lv help", { type: "PLAYING" })
    client.user.setStatus("online")
})

client.on("message", msg => {
    if (msg.content === "!lv help") {
        msg.channel.send({
            embed: {
                color: 3447003,
                title: "List of commands",
                description: "!lv help : show a list of all commands and their description  \n!lv ping : show the latency of the bot  \n!lv info : show the info of the bot  \n!lv invite : show the invite link of the bot  \n!lv delete : delete the last message  \n!lv points : show the points of the user",
            }
        })
    }

    if (msg.content === "!lv ping") {
        msg.channel.send("```" + client.ping + "```")
    }

    if (msg.content === "!lv info") {
        msg.channel.send("```" + "Bot's name: " + client.user.username + "\nBot's ID: " + client.user.id + "\nBot's ping: " + client.ping + "```")
    }

    if (msg.content.includes("fuck") ||
        msg.content.includes("shit") ||
        msg.content.includes("bitch") ||
        msg.content.includes("ass")) {
        msg.channel.send("```You are not allowed to use such words! :)```")
        msg.delete()
    }

    if (msg.content.includes("!lv points")) {
        setTimeout(() => {
            msg.author.points = 0;
        }, 300000)

        msg.channel.send("```" + "You have " + msg.author.points + " points!```")

        msg.author.points += 1;

        if (msg.author.points > 100) {
            msg.author.level += 1;
            msg.channel.send("```You are now level " + msg.author.level + "!```")
        }

        const embed = new Discord.RichEmbed()
            .setTitle("Level and points")
            .setColor(0x00AE86)
            .setDescription("You are now level " + msg.author.level + " and have " + msg.author.points + " points!")
            .setFooter("Bot made by: avangers#0001")
            .setTimestamp()
        msg.channel.send({ embed })
    }

    if (msg.content.includes("!lv level")) {
        msg.channel.send("```You are level " + msg.author.level + "!```")
    }

    if (msg.content.includes("!lv add points")) {
        msg.channel.send("```How many points do you want to add?```")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        collector.on('collect', message => {
            if (message.content.includes("!lv add points")) {
                msg.channel.send("```You have to add a number!```")
            } else {
                msg.channel.send("```You have added " + message.content + " points!```")
                msg.author.points += parseInt(message.content);
                if (msg.author.points > 100) {
                    msg.author.level += 1;
                    msg.channel.send("```You are now level " + msg.author.level + "!```")
                }
                const embed = new Discord.RichEmbed()
                    .setTitle("Level and points")
                    .setColor(0x00AE86)
                    .setDescription("You are now level " + msg.author.level + " and have " + msg.author.points + " points!")
                    .setFooter("Bot made by: avangers#0001")
                    .setTimestamp()
                msg.channel.send({ embed })
            }
        })
    }

    if (msg.content.includes("!lv delete")) {
        msg.delete()
    }

    if (msg.content.includes("!lv delete")) {
        msg.channel.send("```How many messages do you want to delete?```")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        collector.on('collect', message => {
            if (message.content.includes("!lv delete")) {
                msg.channel.send("```You have to add a number!```")
            } else {
                msg.channel.bulkDelete(parseInt(message.content));
            }
        })
    }

    if (msg.content.includes("!lv kick")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```Who do you want to kick?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv kick")) {
                    msg.channel.send("```You have to add a user!```")
                } else {
                    msg.channel.send("```You have kicked " + message.content + "!```")
                    msg.guild.member(message.mentions.users.first()).kick();
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv roles")) {
        msg.channel.send("```" + msg.guild.roles.map(r => r.name).join(" ") + "```")
    }

    if (msg.content.includes("!lv channel")) {
        msg.guild.createChannel(msg.guild.members.size, "text");
    }

    if (msg.content.includes("!lv addrole")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```Who do you want to add a role to?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv addrole")) {
                    msg.channel.send("```You have to add a user!```")
                } else {
                    msg.channel.send("```You have added a role to " + message.content + "!```")
                    msg.guild.member(message.mentions.users.first()).addRole("639796880884827648");
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv share")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```What do you want to share?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv share")) {
                    msg.channel.send("```You have to add a link!```")
                } else {
                    msg.channel.send("```You have shared " + message.content + "!```")
                    const embed = new Discord.RichEmbed()
                        .setTitle("Shared link")
                        .setColor(0x00AE86)
                        .setDescription("You have shared " + message.content + "!")
                        .setFooter("Bot made by: avangers#0001")
                        .setTimestamp()
                    msg.channel.send({ embed })
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv poll")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```What do you want to poll?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv poll")) {
                    msg.channel.send("```You have to add a question!```")
                } else {
                    msg.channel.send("```You have created a poll!```")
                    const embed = new Discord.RichEmbed()
                        .setTitle("Poll")
                        .setColor(0x00AE86)
                        .setDescription("You have created a poll!\n" + message.content)
                        .setFooter("Bot made by: avangers#0001")
                        .setTimestamp()
                    msg.channel.send({ embed })
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    client.user.activity = {
        name: "!lv help",
        type: "PLAYING",
        timestamps: {
            start: new Date(),
            end: new Date() + 10000
        }
    }

    if (msg.content.includes("!lv avatar")) {
        msg.channel.send(msg.author.avatarURL)
    }

    if (new Date().getDate() === 1 && new Date().getMonth() === 4) {
        msg.channel.send("Happy April Fools Day!")
    }

    if (msg.content.includes("!lv play")) {
        if (msg.member.voiceChannel) {
            if (msg.content.includes("https://www.youtube.com/watch?v=")) {
                msg.member.voiceChannel.join()
                    .then(connection => {
                        const stream = ytdl(msg.content, { filter: 'audioonly' });
                        const dispatcher = connection.playStream(stream);
                        dispatcher.on('end', () => {
                            msg.member.voiceChannel.leave()
                        });
                    })
            } else {
                msg.member.voiceChannel.join()
                    .then(connection => {
                        const stream = ytdl(`https://www.youtube.com/results?search_query=${msg.content}`, { filter: 'audioonly' });
                        const dispatcher = connection.playStream(stream);
                        dispatcher.on('end', () => {
                            msg.member.voiceChannel.leave()
                        });
                    })
            }
        } else {
            msg.channel.send("You have to be in a voice channel!")
        }
    }

    if (msg.content.includes("!lv mute")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```Who do you want to mute?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv mute")) {
                    msg.channel.send("```You have to add a user!```")
                } else {
                    msg.channel.send("```You have muted " + message.content + "!```")
                    msg.guild.member(message.mentions.users.first()).setMute(true);
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv stop")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```Bot stopped!```")
            msg.member.voiceChannel.leave()
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv ban")) {
        if (msg.author.id === "639796880884827648") {
            msg.channel.send("```Who do you want to ban?```")
            const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
            collector.on('collect', message => {
                if (message.content.includes("!lv ban")) {
                    msg.channel.send("```You have to add a user!```")
                } else {
                    msg.channel.send("```You have banned " + message.content + "!```")
                    msg.guild.member(message.mentions.users.first()).ban();
                }
            })
        } else {
            msg.channel.send("```You are not allowed to use this command!```")
        }
    }

    if (msg.content.includes("!lv click test")) {
        const embed = new Discord.RichEmbed()
            .setTitle("Click me")
            .setColor(0x00AE86)
            .setDescription("Click me!")
            .setFooter("Bot made by: avangers#0001")
            .setTimestamp()
        msg.channel.send({ embed })
        msg.author.send("```Click the button!```")
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        collector.on('collect', message => {
            msg.author.send("```You clicked the button in " + message.createdTimestamp - message.createdTimestamp + " ticks!```")
        })
    }
    setTimeout(() => {
        msg.author.send("```You clicked the button in " + collector.collected.size + " ticks!```")
    }, 5000)

    if (date.getDate() === 1 && date.getMonth() === 0) {
        const embed = new Discord.RichEmbed()
            .setTitle("Happy New Year!")
            .setColor(0x00AE86)
            .setDescription("Happy New Year!")
            .setFooter("Bot made by: avangers#0001")
            .setTimestamp()
        msg.channel.send({ embed })

        const randomUser = msg.guild.members.random()
        randomUser.send("```Contact avangers#0001 to get free month of discord nitro!```")
    }
})

client.login(process.env.DISCORD_TOKEN);