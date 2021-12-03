const deleteFriendCode = async (msg, db) => {
  const rowCount = await db.destroy({
    where: { username: `${msg.author.username}` },
  });

  // Delete a message
    msg.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  
  if (!rowCount) return msg.reply("Ce code ami n'existe pas");

  return msg.reply("Code ami supprimé.");
};
module.exports = deleteFriendCode;
