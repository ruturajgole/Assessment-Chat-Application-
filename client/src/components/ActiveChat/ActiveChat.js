import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
  readMessage,
}) => {
  const classes = useStyles();

  const conversation = conversations
    ? conversations.find(
        (conversation) => conversation.otherUsers.some((user) => user && user.username === activeConversation)
      )
    : {};

  useEffect(() => {
    if(conversation &&
       conversation.messages.length &&
       conversation.lastMessageSeen !== conversation.messages[conversation.messages.length - 1] &&
       conversation.messages[conversation.messages.length - 1].senderId !== user.id){

      const { messages } = conversation;

      readMessage({
        id: conversation.id,
        lastMessageSeen: (messages[messages.length - 1].text)
      });
    }
  }, [activeConversation, conversation && conversation.messages])

  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  return (
    <Box className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Header
            username={conversation.users.reduce((acc, user, index) => index ? acc + ", " + user.username : user.username, "" )}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            {user && (
              <>
                <Messages
                  messages={conversation.messages}
                  otherUser={conversation.otherUser}
                  userId={user.id}
                  lastMessageSeen={conversation.lastMessageSeen}
                />
                <Input
                  otherUser={conversation.otherUser}
                  conversationId={conversation.id || null}
                  user={user}
                  postMessage={postMessage}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
