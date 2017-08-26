import io from 'socket.io-client';

import {
  createSocket,
  canCombineLastMessage,
  combineLastMessage,
} from './functions.js';

describe('createSocket', () => {
  it('initiates a socket connection', () => {
    const app = {
      receiveMessage: { bind: jest.fn() },
      operatorTyping: { bind: jest.fn() },
      handleNewConnection: { bind: jest.fn() },
      handleDisconnected: { bind: jest.fn() },
      handleReconnecting: { bind: jest.fn() },
    };

    const socket = {
      on: jest.fn()
    };

    // Mock the socket library
    io.connect = jest.fn(() => socket);

    createSocket(app);

    expect(io.connect).toHaveBeenCalled();
  });

  it('listens for events', () => {
    const app = {
      receiveMessage: { bind: jest.fn() },
      operatorTyping: { bind: jest.fn() },
      handleNewConnection: { bind: jest.fn() },
      handleDisconnected: { bind: jest.fn() },
      handleReconnecting: { bind: jest.fn() },
    };

    const socket = {
      on: jest.fn()
    };

    // Mock the socket library
    io.connect = jest.fn(() => socket);

    createSocket(app);

    expect(socket.on).toHaveBeenCalledWith('operator:message', undefined);
    expect(socket.on).toHaveBeenCalledWith('operator:typing', undefined);
    expect(socket.on).toHaveBeenCalledWith('chat:new', undefined);
    expect(socket.on).toHaveBeenCalledWith('disconnect', undefined);
    expect(socket.on).toHaveBeenCalledWith('reconnecting', undefined);
  });
});

describe('canCombineLastMessage', () => {
  it('returns false if there are no messages', () => {
    const messages = [];
    const msg = {};

    expect(canCombineLastMessage(msg, messages)).toBe(false);
  });

  it('returns false if either message or last message has no author property', () => {
    const messages = [{}];
    const msg = {};

    expect(canCombineLastMessage(msg, messages)).toBe(false);
  });

  it('returns false if message author and last message author are not equal', () => {
    const messages = [{author: 'TEST2'}];
    const msg = {author: 'TEST1'};

    expect(canCombineLastMessage(msg, messages)).toBe(false);
  });

  it('returns true if message author and last message author are equal', () => {
    const messages = [{author: 'TEST'}];
    const msg = {author: 'TEST'};

    expect(canCombineLastMessage(msg, messages)).toBe(true);
  });
});

describe('combineLastMessage', () => {
  it('returns an array', () => {
    const messages = [{}];
    const msg = {};

    expect(combineLastMessage(msg, messages).push instanceof Function).toBe(true);
  });

  it('converts malformed messages to proper format', () => {
    const messages = [{
      author: 'TEST',
      content: 'TEST',
    }];
    const msg = {
      author: 'TEST',
      content: 'TEST',
    };

    expect(combineLastMessage(msg, messages)[0].content.push instanceof Function).toBe(true);
  });

  it('combines messages when appropriate', () => {
    const messages = [{author: 'TEST'}];
    const msg = {author: 'TEST'};

    expect(combineLastMessage(msg, messages).length).toBe(1);
  });

  it('does not combine messages when inappropriate', () => {
    const messages = [{author: 'TEST1'}];
    const msg = {author: 'TEST2'};

    expect(combineLastMessage(msg, messages).length).toBe(2);
  });
});
