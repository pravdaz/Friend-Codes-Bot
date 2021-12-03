const addFriendCode = async (friendcode, msg, db) => {
  const regex = /[0-9\s]/m;

  // Validate friend code
  if (
    friendcode.length > 15 ||
    regex.exec(friendcode) === null ||
    friendcode.length < 12
  ) {
    return msg.reply(`Code ami invalide ${friendcode}`);
  }

  // Try inserting username/friendcode into db
  try {
    const insertFriendCode = await db.create({
      username: `${msg.author.username}`,
      pogocode: friendcode,
    });
    
    // Delete a message
    msg.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
    // return 
    return msg.reply(
      `Code ami ${insertFriendCode.pogocode} ajouté` //pour ${insertFriendCode.username}
    );
  } catch (e) {
    // Return error if friendcode already exists
    if (e.name === "SequelizeUniqueConstraintError") {
      return msg.reply("Ce code ami existe déjà.");
    }
    console.log("error adding friend code:", e);
    return msg.reply("Quelque chose s'est mal passé en ajoutant votre code ami...");
  }
};

module.exports = addFriendCode;
