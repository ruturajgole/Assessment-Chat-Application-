import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  messagesCounter: {
    fontSize: 12,
    backgroundColor: "lightblue",
    padding: "0px 10px",
    borderRadius: "10px",
    fontWeight: "bolder",
  },
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { otherUser, messages } = conversation;

  let oldMessage = true;  
  const unreadCount = messages.reduce((acc, value) => {
    if((!conversation.lastMessageSeen ||
        value.text === conversation.lastMessageSeen) &&
        oldMessage){
      oldMessage = false;
    }

    if(oldMessage){
      return acc;
    }

    return (value.senderId === otherUser.id
      && value.text !== conversation.lastMessageSeen) ? (acc + 1) : 0;
  }, 0);  

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {!!unreadCount && (<Typography 
        className={classes.messagesCounter}>
            {unreadCount}
      </Typography>)}
    </Box>
  );
};

export default Chat;
