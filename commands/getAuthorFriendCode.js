const getAuthorFriendCode = async (msg, db) => {
  // Find user in db
  const friendcode = await db.findOne({
    where: { username: `${msg.author.username}` },
  });
  // If user exists send their friend code
  if (friendcode) {
    msg.channel.send(`${friendcode.get("pogocode").split(" ").join("")}`);
//    msg.channel.send(`Le code ami de ${msg.author.username} est:`);
//    return msg.channel.send(
//      `${friendcode.get("pogocode").split(" ").join("")}`
//    );
  } else {
    return msg.reply(`Je ne trouve pas de code ami pour ${msg.author.username}`);
  }
};

module.exports = getAuthorFriendCode;
