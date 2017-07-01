import {
  canCombineLastMessage,
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
