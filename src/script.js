(function (w) {
  const $ = w.jQuery || false;
  const React = w.React || false;
  const ReactDOM = w.ReactDOM || false;
  const io = w.io || false;

  if (!React) {
    console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html')
  }

  if (!ReactDOM) {
    console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html')
  }

  if (!io) {
    console.error('Required dependancy missing, Socket.io. http://socket.io/download/')
  }

  if (!React || !ReactDOM || !io) {
    return
  }



}) (window)