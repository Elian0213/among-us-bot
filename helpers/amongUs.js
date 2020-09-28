function amongUs() {
  // h-hewo cutie >_<
}

// Get party info from (channel)
amongUs.getPartyInfo = function(channel) {
  const data = amongUs.getGameActivitiesFromChannel(channel);

  data.forEach((member) => {
    if (member.activity.length < 1) return

    const activity = member.activity[0];
    amongUs.sendEmbed(activity.party)

    return;
  })
}

// Get game activities from all users in (channel)
amongUs.getGameActivitiesFromChannel = function (id) {
  const channel = client.channels.cache.get(id);

  return channel.members.map((user) => {
    const actActivities = user.presence.activities
    .filter((a) => a.name === config.GAME && a.state === config.STATE)
    .map((activity) => {
      return activity
    })

    return {
      name: user.name,
      id: user.id,
      activity: actActivities
    };
  })
}

amongUs.sendEmbed = function(game) {
  const channel = client.channels.cache.get(config.GAME_INFO_CHANNEL);

  channel.send(new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Among Us')
  .addField('Code', game.id, true)
  .addField('Players', `${game.size[0]}/${game.size[1]}`)
  .setTimestamp());
}

module.exports = amongUs;
