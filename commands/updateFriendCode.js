const updateFriendCode = async (friendcode, msg, db) => {
  const regex = /[0-9\s]/m;

  const affectedRows = await db.update(
    { pogocode: `${friendcode}` },
    { where: { username: `${msg.author.username}` } }
  );

  if (
    friendcode.length > 15 ||
    regex.exec(friendcode) === null ||
    friendcode.length < 12
  ) {
    return msg.reply(`Code ami invalide ${friendcode}`);
  }
  if (affectedRows > 0) {
    return msg.reply(
      `Votre code ami a été mis à jour avec ${friendcode.split(" ").join("")}.`
    );
  }
  return msg.reply(
    `Je ne trouve pas de code ami pour ${msg.author.username}.`
  );
};

module.exports = updateFriendCode;
