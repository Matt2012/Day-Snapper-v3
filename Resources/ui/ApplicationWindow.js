//Application Window Component Constructor
function ApplicationWindow() {

	var options, cocoaFish, cocoafishMgr = require('com.ci.cocoafish');
	Ti.API.info("module is => " + cocoafishMgr);
	options = {
		"consumer_key" : "STmCl1EnGc2y4SE9A9mltOUG0rHlmorD",
		"secret_key" : "znX6WR81pMYKlSpwX6S6TvifI68lSKRY"
	};
	
	if(Ti.Platform.name == "android") {
		cocoaFish = cocoafishMgr.createCocoaFishMgr(options);
	} else {
		cocoaFish = cocoafishMgr.create(options);
	}
	Ti.API.info("proxy is => " + cocoaFish);
	
	
	alert('test');
	
	var loggedIn = Titanium.App.Properties.getString('loggedIn',false);
	Ti.API.info("Logged In is => " + loggedIn);
	if(loggedIn)
	{
		var FirstView = require('ui/Dashboard');
	}
	else
	{
		var FirstView = require('ui/LoginWindow');
	}
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	//var firstView = new FirstView();
	var firstView = "";
	self.add(firstView);
	
	return self;
}

//make constructor function the public component interface
//module.exports = ApplicationWindow;
ApplicationWindow();