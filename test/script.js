// Fake the document
var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const React = global.window.React = require('react');
const Redux = global.window.Redux = require('redux');
const ReactTestUtils = global.window.ReactTestUtils = require('react-addons-test-utils');
const ReactDOM = global.window.ReactDOM = require('react-dom');
const ReactRedux = global.window.ReactRedux = require('react-redux');
const ReactJSS = global.window.reactJss = require('react-jss');
const io = global.window.io = require('socket.io-client');
const sinon = require('sinon');

const { expect } = require('chai');
const { mount, shallow, render } = require('enzyme');

const { store, Message, MessageList, Input, Chat } = require('../src/script');


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
    it ('Does something', function () {
      const wrapper = shallow(<Message />);

      // assert.isNotEmpty(wrapper.prop(content));
    });
  });

  describe('<MessageList />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

  describe('<Input />', function () {

    beforeEach (function () {
      sinon.spy(Input.prototype, 'render');
      // sinon.spy(store, 'dispatch');
    });

    afterEach(function () {
      Input.prototype.render.restore();
      // store.dispatch.restore();
    })

    it ('renders', function () {
      const wrapper = render(<Input socket={{}} />);

      expect(Input.prototype.render.calledOnce).to.equal(true);
    });

    // it ('dispatches a UI_TYPING action on key press', function () {
    //   const wrapper = mount(<Input socket={{}} />);
    //   wrapper.find('textarea').simulate('keypress', {keyCode: 13}) // Enter
    //
    //   // console.log('DISPATCH', wrapper.find('textarea').node);
    //   expect(store.dispatch.called).to.equal(true);
    // })
  });

  describe('<Chat />', function () {
    it ('Does something', function (done) {
      done();
    });
  });

});
