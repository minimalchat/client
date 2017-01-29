// import React, { Component } from 'react';

// class Status extends Component {
//   constructor (props) {
//     super(...arguments);

//     this.socket = props.socket;
//     this.socket.on('operator:typing', this.onTyping);

//     this.state = {
//       typing: false,
//       style: {}
//     };
//   }

//   onTyping () {
//     console.log('OPERATOR TYPING ...');
//   }

//   render () {
//     return (
//         <ul className="letschat-message-status" style={{
//           position: 'fixed',
//           bottom: '48px',
//           margin: 0,
//           boxSizing: 'border-box',
//           padding: '4px 8px',
//           height: '24px',
//           width: '265px',
//           fontSize: '13px',
//           fontFamily: 'sans-serif',
//           fontStyle: 'italic',
//           listStyle: 'none',
//           color: '#D1D1D1'
//         }}>
//           <li><span>John is typing...</span></li>
//         </ul>
//       )
//   }
// }
