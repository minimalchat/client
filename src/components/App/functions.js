

export function canCombineLastMessage (msg, messages) {
  const previousMsg = messages[messages.length - 1];

  // If this is the first message in the conversation
  if (previousMsg === undefined) return false;

  // If theres no author field, return false
  if (!msg.hasOwnProperty('author') ||
    !previousMsg.hasOwnProperty('author')) return false;
  
  // If last message was not from the same author
  if (msg.author !== previousMsg.author) return false;
  
  return true;
};


