import store from '.';

// TODO: Find better place for this.
//  Wasn't sure where to put this file. Can be moved wherever.
describe('state', () => {
  it('has a ui.style property', () => {
    const state = store.getState();

    expect(state.ui.hasOwnProperty('style')).toBe(true);
    expect(state.ui.style).not.toBe(undefined);
  });
});
