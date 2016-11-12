// Fake the document
const jsdom = require('jsdom').jsdom;
global.document = jsdom("<html><body></body></html>");
global.window = document.defaultView; // Fake the window too
global.navigator = global.window.navigator; // .. and navigator too

const React = global.React = require('react');
const Redux = global.Redux = require('redux');
const ReactTestUtils = global.ReactTestUtils = require('react-addons-test-utils');
const ReactDOM = global.ReactDOM = require('react-dom');
const ReactRedux = global.ReactRedux = require('react-redux');
const ReactJSS = global.reactJss = require('react-jss');
const io = global.io = require('socket.io-client');


const mnml = require('../src/script');

const { assert } = require('chai');
const { mount, shallow } = require('enzyme');

// What do I want to test/make sure works with absolution
// - redux ACTIONS are doing what they intend to do (both sides, firing and
//  components reception)
//    - UI_OPEN
//    - UI_CLOSE
//    - UI_STYLE_MESSANGER
//    - UI_STYLE_MESSANGER
//    - CHAT_CONNECTED
//    - CHAT_DISCONNECTED
//    - CHAT_MESSAGE_OPERATOR
//    - CHAT_MESSAGE_CLIENT
// - styling works
//

describe('MnmlChat', function () {

  describe('<Message />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

  describe('<MessageList />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

  describe('<Input />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

  describe('<Chat />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

});
