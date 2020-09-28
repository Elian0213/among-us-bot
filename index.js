global.config = require('dotenv').config().parsed;
global.Discord = require('discord.js');

global.client = new Discord.Client();

const amongUsHelper = require('./helpers/amongUs.js');

client.on('voiceStateUpdate', () => {
  amongUsHelper.getPartyInfo(config.ALIVE_VC);
})

client.on('presenceUpdate', () => {
  amongUsHelper.getPartyInfo(config.ALIVE_VC);
})


// Start that boy
client.on('ready', () => {
  console.log('ready')
})

client.login(config['TOKEN']);
