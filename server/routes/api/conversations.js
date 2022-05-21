const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      attributes: ["id", "lastMessageSeen"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: User, as: "users"},
        { model: Message, order: ["createdAt", "DESC"] },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      convoJSON.otherUsers = convoJSON.users.filter((user) => user.id !== userId);

      convoJSON.otherUsers.forEach((user) => {
        user.online = onlineUsers.includes(user.id);
      });

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      convoJSON.messages = convoJSON.messages.reverse();
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { id, lastMessageSeen } = req.body;

    Conversation.update({lastMessageSeen}, {where: {id}});
    res.json({ id, lastMessageSeen });
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
});


module.exports = router;
