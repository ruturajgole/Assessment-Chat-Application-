const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require("./group");

// associations

//User.hasMany(Conversation);
//Conversation.belongsTo(User, { as: "user1" });
//Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.hasMany(Group);
Conversation.hasMany(Group);
Group.belongsTo(User, { as: "user" });
Group.belongsTo(Conversation, { as: "conversation" });

module.exports = {
  User,
  Conversation,
  Message,
  Group
};
