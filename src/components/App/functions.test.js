import {
  canCombineLastMessage,
  combineLastMessage,
} from './functions.js';

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
