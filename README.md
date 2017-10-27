# Minimal Chat client script

[![Build Status](https://travis-ci.org/minimalchat/client.svg?branch=master)](https://travis-ci.org/minimalchat/client)
[![Coverage Status](https://coveralls.io/repos/github/minimalchat/client/badge.svg?branch=master)](https://coveralls.io/github/minimalchat/client?branch=master)

---

Minimal Chat is an open source live chat system providing live one on one messaging to a website visitor and an operator.

Minimal Chat is:
-   **minimal**: simple, lightweight, accessible
-   **extensible**: modular, pluggable, hookable, composable


Screenshot
---
![client-screenshot-2](https://user-images.githubusercontent.com/563301/32126537-35036eb6-bb3f-11e7-9c33-a1f9fa602601.png)



---

The client script is embedded into a html page just before the `</body>` tag.

### Usage

```javascript
<!-- Start of Async Minimal Chat Code -->
<script>
!function() {
  o = document.createElement("script"),
  o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "/mnml-0.2.0.min.js",
  n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
}();
</script>
<!-- End of Async Minimal Chat Code -->
```

### Development

Developing for the client is fairly easy, but does require a seperate example website that is not included in this repository currently. All of the Minimal Chat repositories are run through `make`. To get the code running:

1.  Clone the repository
2.  `npm install`
3.  `make`
4.  Copy the contents of the `dist/` folder into your test website
5.  Add the embed code (found below) into your test website
6.  Run test website (you'll want to mount this on a server if it's a static site to avoid CORS issues.)
7.  Profit!

