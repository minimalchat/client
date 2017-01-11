// wasn't sure where to put this file. can be moved wherever. 
describe('state', () => {
  it('has a ui.style property', () => {
    const state = store.getState();
    expect(state.ui.hasOwnProperty('chatStyle')).toBe(true);
    expect(state.ui.chatStyle).not.toBe(undefined);
  });
});