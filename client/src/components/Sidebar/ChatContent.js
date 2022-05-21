import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  message: {
    display: "flex",
    justifyContent: "space-between",
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "bolder",
    color: "black",
    letterSpacing: -0.17,
  }
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();
  const { otherUsers, messages, users } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  // const lastMessageSeen = (
  //   messages[messages.length - 1].senderId === otherUser.id &&
  //   conversation.lastMessageSeen !== latestMessageText);

  return (
    <Box className={classes.root}>
      <Box>
       {otherUsers.map((user) => 
        <Typography key={user.username} className={classes.username}>
          {user.username}
        </Typography>)}
        <Typography 
          className={!true ? classes.previewText : classes.unreadText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
