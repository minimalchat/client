(function (w) {
  // Libraries
  // const $ = w.jQuery || false;
  const React = w.React || false;
  const Redux = w.Redux || false;
  const ReactDOM = w.ReactDOM || false;
  const ReactRedux = w.ReactRedux || false;
  const io = w.io || false;

  // Create chat box wrapper
  class ChatBox extends React.Component {
    render () {
      return (
        <div id="lets-chat" className="wrapper"></div>
      )
    }
  }

  if (!React) {
    console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html')
  }

  if (!Redux) {
    console.error('Required dependancy missing, Redux. http://redux.js.org/#installation')
  }

  if (!ReactDOM) {
    console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html')
  }

  if (!ReactRedux) {
    console.error('Required dependancy missing, ReactRedux. https://github.com/reactjs/react-redux#installation')
  }

  if (!io) {
    console.error('Required dependancy missing, Socket.io. http://socket.io/download/')
  }

  if (!React || !ReactDOM || !io) {
    return
  }


  // Connect to our socket server
  io.connect('http://localhost:8000');

  // Our generic render function
  let render = function render () {
    ReactDOM.render(
      <ChatBox />,
      document.getElementById('topbar')
    );
  };

  // Our render loop
  let unsubscribe = store.subscribe(() => {
    console.log('DEBUG', store.getState());
    render();
  });

  // Start rendering
  render();

}) (window)