
function lobby() {
  // h-hewo cutie >_<
}

lobby.create = function (activity) {
  const lobby = {};
  lobby.players = [];

  lobby.setValues = function (activity) {
    this.code = activity.party.id;
    this.amount = activity.party.size[0];
    this.size = activity.party.size[1];
  }.bind(lobby);

  lobby.addPlayer = function (user) {
    const exists = this.players.find(u => user.id === u.id);
    if (exists === undefined) {
      this.players.push(user);
    }
  }.bind(lobby);

  lobby.joinPlayers = function () {
    const names = this.players.map(p => {return p.name});
    return names.join(', ');
  }.bind(lobby);

  lobby.setValues(activity);

  return lobby;
}

module.exports = lobby;
