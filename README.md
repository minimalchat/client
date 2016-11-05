# Minimal Chat client script

[![Build Status](https://travis-ci.org/minimalchat/mnml-client.svg?branch=master)](https://travis-ci.org/minimalchat/mnml-client)
[![Coverage Status](https://coveralls.io/repos/github/minimalchat/mnml-client/badge.svg?branch=master)](https://coveralls.io/github/minimalchat/mnml-client?branch=master)

---

Minimal Chat is an open source live chat system providing live one on one messaging to a website visitor and an operator.

Minimal Chat is:
-   **minimal**: simple, lightweight, accessible
-   **extensible**: modular, pluggable, hookable, composable

---

The client script is embedded into a html page just before the `</body>` tag. The script itself is  either self-hosted or from a CDN provider. As of version v1.0.0 none of the dependencies are included and should be made available as well. This was initially by design, but in future versions there will be a full (dependencies included) and lite versions.

Dependencies required:
-   [Socket.io](https://github.com/socketio/socket.io) `>=1.4.5`
-   [React](https://github.com/facebook/react) `>=15`
-   [ReactDOM](https://github.com/facebook/react) `>=15`
-   [Redux](https://github.com/reactjs/redux) `>=3.6.0`
-   [ReactRedux](https://github.com/reactjs/react-redux) `>=4.4.5`
-   [ReactJSS](https://github.com/cssinjs/react-jss) `>=4.1.2`

### Usage

```javascript
<!-- Start of Async LetsChat Code -->
<script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script type="text/javascript" src="https://unpkg.com/react@15/dist/react.js"></script>
<script type="text/javascript" src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
<script type="text/javascript" src="https://unpkg.com/redux@3.6.0/dist/redux.js"></script>
<script type="text/javascript" src="https://unpkg.com/react-redux@4.4.5/dist/react-redux.js"></script>
<script type="text/javascript" src="https://unpkg.com/react-jss@4.1.2/dist/jss-compose.js"></script>
<script>
!function() {
  o = document.createElement("script"),
  o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "/mnml-0.0.1.js",
  n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
}();
</script>
<!-- End of Async LetsChat Code -->
```
