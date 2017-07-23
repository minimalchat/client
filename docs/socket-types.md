this.socket.on('connect', this.onSocketConnected());
    this.socket.on('connect_error', this.onSocketConnectionError);
    this.socket.on('connect_timeout', this.onSocketTimeout);
    this.socket.on('disconnect', this.onSocketDisconnected());
    this.socket.on('reconnect', this.onSocketReconnected());
    this.socket.on('reconnecting', this.onSocketReconnecting);
    // this.socket.on('reconnect_error', socketConnectionError);
    this.socket.on('reconnect_failed', this.onSocketReconnectionFailed);
    this.socket.on('reconnect_timeout', this.onSocketTimeout);
    this.socket.on('ping', this.onPing);
    this.socket.on('pong', this.onPong);

    // Mnml specific socket messages
    this.socket.on('operator:message', this.handleOperatorMessage());
    this.socket.on('chat:new', this.handleChatNew());
    this.socket.on('chat:existing', this.handleChatExisting());