import React from 'react';
import { Box, Badge, Typography } from '@material-ui/core';
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
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { messages } = conversation;

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

    return (conversation.users.some((user) => user.id === value.senderId)
      && value.text !== conversation.lastMessageSeen) ? (acc + 1) : 0;
  }, 0);  

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.users[0].username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      {conversation.otherUsers.map((user) => 
      <BadgeAvatar
        key={user.username}
        photoUrl={user.photoUrl}
        username={user.username}
        online={user.online}
        sidebar={user}
      />)}
      <ChatContent conversation={conversation} />
      <Badge
        color={"primary"}
        badgeContent={unreadCount}/>
    </Box>
  );
};

export default Chat;
