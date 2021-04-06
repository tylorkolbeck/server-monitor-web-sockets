# Web socket server health monitor

![Demo Screenshot](/screen_shot.png?raw=true 'Demo')

Node Client is a node server which will have its health monitored. This client connects to the server via web sockets which in turn
pushes health through to the React client and displays it on a dashboard.

The React client will detect disconnects as well as automatically attempt a reconnect. The front end will show CPU Load, Memory Usage as well as general system information.

The server is scalable. It will fork node instances and these instances are managed through a Redis in memory database.

Each server instance is also stored in a MongoDB to track all connections so that the front end knows that a server is not connected.
