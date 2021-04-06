# Web socket server health monitor

![Demo Screenshot](/screen_shot.png?raw=true 'Demo')

Node Client is a node server which will have its health monitored. This client connects to the server view web socket which in turn
pushes health through to the React client and display it on a dashboard.

The React client will detect disconnects as well as automatically attempt a reconnect.

The server is scalable. It will fork node instances and these instances are managed through Redis in memory database.

Each server instance is also stored in a MongoDB to track all connections.
