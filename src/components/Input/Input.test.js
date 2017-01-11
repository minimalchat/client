import { Input } from './Input';

describe('Input', () => {
  afterEach(() => {
    socket.emit.mockReset();
  });

  it('matches snapshot', () => {
    const component = shallow(<Input socket={socket} />);
    expect(component).toMatchSnapshot();
  });

  it('emits a client:typing event on keyDown', () => {
    const component = mount(<Input socket={socket} />);
    component.find('textarea').simulate('keyDown', {
      keyCode: 84,
      key: "t"
    });

    expect(socket.emit).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith('client:typing');
  });

  // fails at "this.props.dispatch" in the component.
  // not sure how to work with that. 
  it('emits a client:message event on keyDown', () => {
    store.dispatch = jest.fn();
    const component = mount(<Input socket={socket} />);
    component.find('textarea').simulate('keyDown', {
      keyCode: 13,
      shiftKey: false,
      key: "Enter"
    });

    expect(socket.emit).toHaveBeenCalledTimes(2);
    expect(socket.emit.mock.calls[0][0]).toBe('client:message');
  });
});