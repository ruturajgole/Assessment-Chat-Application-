const Sequelize = require("sequelize");
const db = require("../db");
const Conversation = require("./conversation");
const User = require("./user");

const Group = db.define("group", {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    conversationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Conversation,
            key: "id"
        }
    },
});

module.exports = Group;
