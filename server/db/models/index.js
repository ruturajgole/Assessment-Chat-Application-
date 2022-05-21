const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require("./group");

// associations

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.belongsToMany(Conversation, {through: Group, as: "conversations"});
Conversation.belongsToMany(User, {through: Group, as: "users"});

module.exports = {
  User,
  Conversation,
  Message,
  Group
};
