# Web socket server health monitor

Node Client is a node server which will have its health monitored. This client connects to the server view web socket which in turn
pushes health through to the React client and display it on a dashboard.

The React client will detect disconnects as well as automatically attempt a reconnect.
