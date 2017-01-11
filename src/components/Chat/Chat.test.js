import {Chat} from './Chat'

describe('Chat', () => {
  it('matches snapshot', () => {
    const component = shallow(<Chat store={store} />);
    expect(component).toMatchSnapshot();
  });

  it('starts a socket connection', () => {
    expect(io.connect).toHaveBeenCalled();
  })

});