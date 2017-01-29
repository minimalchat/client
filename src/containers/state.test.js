import store from '.';

// TODO: Find better place for this.
//  Wasn't sure where to put this file. Can be moved wherever.
describe('state', () => {
  it('has a ui.style property', () => {
    const state = store.getState();

    expect(state.ui.hasOwnProperty('chatStyle')).toBe(true);
    expect(state.ui.chatStyle).not.toBe(undefined);
  });
});
