// Setup anything for tests (but know that this is skipped by eslinting)

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
      throw new Error(message);
  }
};
