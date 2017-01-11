import {MessageList} from './Messages';

describe('MessageList', () => {
  // this fails as the "socket" is not a ReactNode
  it('matches snapshot', () => {
    const component = snapshot.create(<MessageList socket={socket} />);
    expect(component).toMatchSnapshot();
  });
});