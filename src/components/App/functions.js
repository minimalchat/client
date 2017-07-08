import io from 'socket.io-client';

const remoteHost = process.env.REMOTE_HOST || 'localhost';
const remotePort = process.env.REMOTE_PORT || '8000';

const socketPath = `http://${remoteHost}:${remotePort}`;

export function createSocket (app) {
  const socket = io.connect(socketPath, {
    secure: false,
    reconnectionAttempts: 10,
    query: 'type=client',
  });

  socket.on('operator:message', app.receiveMessage);
  socket.on('chat:new', app.handleNewConnection);

  return socket;
}

export function canCombineLastMessage (msg, messages) {
  const lastMsg = messages[messages.length - 1];

  // If this is the first message in the conversation
  if (lastMsg === undefined) return false;

  // If theres no author field, return false
  if (!msg.hasOwnProperty('author') || !lastMsg.hasOwnProperty('author')) return false;

  // If last message was not from the same author
  if (msg.author !== lastMsg.author) return false;

  return true;
}

export function combineLastMessage (msg, messages) {
  const lastMsg = messages[messages.length - 1];
  const newMsg = msg;

  newMsg.content = newMsg.content || [];

  // Is the content of the new message an array?
  if (!(newMsg.content.push instanceof Function)) {
    newMsg.content = [newMsg.content];
  }

  // Can we combine the last message?
  if (canCombineLastMessage(msg, messages)) {
    const combinedMessages = [...messages];

    // If there is no content in the last message make sure we can add some
    lastMsg.content = lastMsg.content || [];

    // Is the content of the last message an array?
    if (!(lastMsg.content.push instanceof Function)) {
      lastMsg.content = [lastMsg.content];
    }

    // Push contents to last message
    lastMsg.content.push(...newMsg.content);

    // Splice in new last message
    // TODO: This may not be necessary if lastMsg is a reference to messages?
    combinedMessages.splice(combinedMessages.length - 1, 1, lastMsg);

    return combinedMessages;
  }

  return [...messages, newMsg];
}
