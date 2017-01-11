import React from 'react';
import renderer from 'react-test-renderer';

global.React = React;
global.renderer = renderer;

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
      throw new Error(message);
  }
};