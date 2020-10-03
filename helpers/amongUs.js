let detectedLobbies = [];

const lobbyHelper = require('./lobby.js');

function amongUs() {
  // h-hewo cutie >_<
}

// Get game activities from all users in (channel)
amongUs.getGameActivitiesFromChannel = function (id) {
  const channel = client.channels.cache.get(id);

  return channel.members.map((user) => {
    const actActivities = user.presence.activities
    .filter((a) => a.name === config.GAME && a.state === config.STATE)
    .map((activity) => {
      return activity
    });

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      activity: actActivities
    };
  })
}

// Get party info from (channel)
amongUs.getPartyInfo = function (channel) {
  let data = amongUs.getGameActivitiesFromChannel(channel);

  data.forEach((member) => {
    if (member.activity.length < 1) return

    const lobby = amongUs.findOrCreateLobby(member);
    lobby.addPlayer(member.user);
    amongUs.addLobby(lobby);
  });

  if (detectedLobbies.length > 0) {
    amongUs.sendEmbed();
  }
}

// sends or updates embed
amongUs.sendEmbed = function () {
  const channel = client.channels.cache.get(config.GAME_INFO_CHANNEL);
  channel.messages.fetch({limit: 1}).then(messages => {
    const embed = amongUs.initEmbed();
    const message = messages.first();

    if (message === undefined) {
      channel.send(embed);
    } else {
      amongUs.editEmbed(message, embed);
    }
  }).catch(console.error);
}

// replaces embed of given message
amongUs.editEmbed = function (message, embed) {
  return message.edit(embed);
}

// creates the embed based on game
amongUs.initEmbed = function () {
  let embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Among Us')
  .setTimestamp()
  .setFooter('Join Us!', client.user.displayAvatarURL());

  
  detectedLobbies.forEach(function (lobby) {
    embed.addField('Code', lobby.code, true)
    .addField('Players', `${lobby.amount}/${lobby.size}`, true)
    .addField('Detected Players:', lobby.joinPlayers(), true);
  });

  return embed;
}

amongUs.addLobby = function (lobby) {
  const exists = detectedLobbies.find(l => l.code === lobby.code);
  if (exists === undefined) {
    detectedLobbies.push(lobby);
  }
}

amongUs.findOrCreateLobby = function (member) {
  const activity = member.activity[0];
  let lobby = detectedLobbies.find(l => l.code === activity.party.id);

  if (lobby === undefined) {
    lobby = lobbyHelper.create(activity);
    return lobby;
  }

  lobby.setValues(activity);
  return lobby;
}

module.exports = amongUs;
