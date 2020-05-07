/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

'use strict';

const routeHandler = require('./../handlers/route-handler');
const pageRouterHandler = require('./../handlers/page-route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		this.app.get('/', pageRouterHandler.index);
		this.app.get('/login', pageRouterHandler.login);
		this.app.get('/register', pageRouterHandler.register);
		this.app.get('/home', pageRouterHandler.home);
		this.app.get('/chat', pageRouterHandler.chat);
		this.app.get('/aboutus', pageRouterHandler.aboutus);
		this.app.get('/logout', pageRouterHandler.logout);

		this.app.post('/usernameAvailable', routeHandler.userNameCheckHandler);

		this.app.post('/register', routeHandler.registerRouteHandler);

		this.app.post('/login', routeHandler.loginRouteHandler);

		this.app.post('/userSessionCheck', routeHandler.userSessionCheckRouteHandler);

		this.app.post('/getMessages', routeHandler.getMessagesRouteHandler);

		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;