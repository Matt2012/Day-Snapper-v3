function LoginView() {
	var self = Ti.UI.createView();
	
	var titleLabel = Titanium.UI.createLabel({
		text:"Login",
		height:'auto',
		width:'auto',
		top: 25,
		left: 20,
		color:'black',
		font:{fontSize:18, fontWeight: 'bold' },
		textAlign:'center'
	});
	
	var label1 = Titanium.UI.createLabel({
		text:"E-Mail: ",
		height:'auto',
		width:'auto',
		top: 45,
		color:'black',
		font:{fontSize:14, fontWeight: 'bold' },
		textAlign:'center'
	});
		
	var emailTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:'95%',
		top:65,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});
	
	if (Titanium.Platform.name != 'android')  {
		emailTextField.height = 35;
	}
	
	var label2 = Titanium.UI.createLabel({
		text:"Password: ",
		height:'auto',
		width:'auto',
		top: 120,
		color:'black',
		font:{fontSize:14, fontWeight: 'bold' },
		textAlign:'center'
	});
		
	var passwordTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:'95%',
		top:140,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask:true
	});
	
	if (Titanium.Platform.name != 'android')  {
		passwordTextField.height = 35;
	}
	
	var loginButtonArgs = {
		title: "Log In",
		color: "white",
		font:{size:"12pt", fontWeight:'bold'},
		height:40,
		width:"90%",
		top:200,
		backgroundColor: "#5778FF",
		backgroundFocusedColor: "#7A95FF",
		backgroundSelectedColor: "#7A95FF",
		borderWidth:1,
		borderRadius:10,
		borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		loginButtonArgs.backgroundImage = 'none';
	}
	var loginButton = Titanium.UI.createButton(loginButtonArgs);
		
	loginButton.addEventListener('click', function() {
	emailTextField.blur();
	passwordTextField.blur();
	if( emailTextField.value === "" || passwordTextField.value === "" )
	{			
		alert("Please fill in a username & password");
		return false;
	}
	
	Ti.API.info("Running Test: PFUser Login");
	
	var loading = Titanium.UI.createLabel({
		text:"Logging In, Please wait...",
		width:'auto',
		height:40,
		width:"90%",
		top: 335,
		color:'black',
		font:{fontSize:14, fontWeight: 'bold' },
		textAlign:'center'
	});
	
	loginButton.hide();
	self.add(loading);
	
	//start login
	parseapi = require('com.forge42.parseapi');
	//Synchronous User Login
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error, (PFUser or null) user
	var result = parseapi.PFUserLogin( {
		username: emailTextField.value,
		password: passwordTextField.value
	});
					
	//alert(result.succeeded );
	if( result.succeeded ) {
		Ti.API.info("Successfully logged in!");
		var user = result.user;
		Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
		Ti.App.Properties.setProperty('userID',parseapi.PFUserCurrentUser());
		Ti.App.Properties.setProperty('userName',user.objectForKey("name"));
		self.fireEvent('loggedIn',user);
	} else {
		Ti.API.info("Could not login with credentials. ErrorCode: " + result.errorCode + " Error: " + result.error);
		loginButton.show();
		loading.hide();
		alert("Could not recognise that email and password combination");
	}
		
	});
	
	self.add(titleLabel);
	self.add(label1);
	self.add(emailTextField);
	self.add(label2);
	self.add(passwordTextField);
	self.add(loginButton);
	
	return self;
};

module.exports = LoginView;
