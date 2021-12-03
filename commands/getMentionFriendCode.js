const db = require("../db.js");

const getMentionFriendCode = async (user, msg) => {
  if (user) {
    // Find user in db
    const friendcode = await db.findOne({
      where: { username: `${user.username}` },
    });

    if (!user) {
      return msg.reply(
        "L'utilisateur n'existe pas, ou la mention est mal rentrée..."
      );
    }
    // If user exists send their friend code
    if (friendcode) {
      let pogocode = friendcode.get("pogocode").split(" ").join("");
      msg.channel.send(`Code ami :`);
      return msg.channel.send(`${pogocode}`);
    } else {
      return msg.channel.send(
        `Je ne trouve pas de code ami pour ${user.username}`
      );
    }
  }
};

module.exports = getMentionFriendCode;
