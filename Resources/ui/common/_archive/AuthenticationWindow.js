function AuthenticationView() {
	
    Ti.include('../../../lib/ti/global.js');
	
	var self = new ui.View({
		backgroundColor:'white'
	});
	
	var LoginView = require('/ui/common/LoginView');
	var RegisterView = require('/ui/common/RegisterView');
	var EmailPasswordView = require('/ui/common/EmailPasswordView');

	var loginV = new LoginView();
	var registerV = new RegisterView();
	var passwordV = new EmailPasswordView();

    var scrollView = Ti.UI.createScrollableView({
		top:44,
		left:0,
		right:0,
		bottom:44,
		views:[loginV, registerV, passwordV],
		showPagingControl:false
	});
 
    self.add(scrollView);
	
	loginV.addEventListener('loggedIn', function(user) {
		//alert('user logged in'  + user.objectForKey("username"));
		//self.remove(scrollView);
		self.fireEvent('authenticated',user)
		return false;
	});
	
	scrollView.addEventListener('scroll', function(e) {
		//alert('change buttons'+e.index);
		//switch
		//change buttons (show hide);
		switch(e.index)
		{
			case 0:
				//button.register.width = 120;
				//button.login.width = 0;
			break;
			default:
				//button.register.width = 0;
				//button.login.width = 120;
			break;
		}
	});
	
	
	var topBar = new ActionBarView({
		pos: 'top',
		buttons: {
			register: {
				title:'Register',
				width:120
			},
			login: {
				title:'Login',
				width:0,
				show:false
			}
		}
	});

	self.add(topBar.viewProxy);
	
	topBar.addEventListener('buttonPress', function(e) {
		switch(e.id)
		{
			case'register':
				var goPage = 1.0;
			break;
			case'login':
				var goPage = 0.0;
			break;
		}
		//switch statement
		scrollView.scrollToView(goPage);
	});
	
	var bottomBar = new ActionBarView({
		pos: 'bottom',
		buttons: {
			password: {
				title:'Reminder',
				width:120
			}
		}
	});

	self.add(bottomBar.viewProxy);
	
	bottomBar.addEventListener('buttonPress', function(e) {
		scrollView.scrollToView(2.0);
	});
	
	return self;
};

module.exports = AuthenticationView;