The `example site` is used for testing the _minimal client_ for development purposes.

**Usage instructions**:
- `npm i`
- ^ installs `express` to run a server for the index file. This is done in order to avoid CORS issues with the minimal-daemon.
- The example site has `<script>` tags that hook into the built version of the `minimal-client` in `/dist`
- to use this, you must make a symlink to the `dist` folder, where the snippet is compiled to:
- `ln -s ../mnml-client/dist/ public`
