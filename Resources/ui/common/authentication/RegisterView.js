function RegisterView() {
	var self = Ti.UI.createView();
	
	var titleLabel = Titanium.UI.createLabel({
	    text:"Sign Up ",
	    height:'auto',
	    width:'auto',
	    top: 25,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var nameLabel = Titanium.UI.createLabel({
	    text:"Name: ",
	    height:'auto',
	    width:'auto',
	    top: 45,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var nameTextField = Titanium.UI.createTextField({
		color:'#336699',
		height: 'auto',
		width:'95%',
		top:65,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	
	var label1 = Titanium.UI.createLabel({
	    text:"E-Mail: ",
	    height:'auto',
	    width:'auto',
	    top: 120,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var emailTextField = Titanium.UI.createTextField({
		color:'#336699',
		height: 'auto',
		width:'95%',
		hint:"Your email here",
		top:140,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	if (Titanium.Platform.name != 'android')  {
		emailTextField.height = 35;
	}
	
	var label2 = Titanium.UI.createLabel({
			text:"Password: ",
			height:'auto',
			width:'auto',
			top: 200,
			//left: 20,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
	var passwordTextField = Titanium.UI.createTextField({
		color:'#336699',
		height: 'auto',
		width:'95%',
		//right: 5,
		top:220,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask:true,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		passwordTextField.height = 35;
	}
	

	
	var signUpButtonArgs = {
			title: "Sign Up",
			color: "white",
			font:{size:"12pt", fontWeight:'bold'},
			height:40,
			width:"90%",
			top: 280,
			//backgroundImage: "none",
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		signUpButtonArgs.backgroundImage = 'none';
	}
	var signUpButton = Titanium.UI.createButton(signUpButtonArgs);
		
	signUpButton.addEventListener('click', function() {
		
		emailTextField.blur();
		passwordTextField.blur();
		
		if( emailTextField.value === "" || passwordTextField.value === "" )
		{
			alert("Please fill in a username & password");
			return; 
		}
		
		var loading = Titanium.UI.createLabel({
			text:"Signing Up, Please wait...",
			width:'auto',
			height:40,
			width:"90%",
			top: 335,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
		signUpButton.hide();
		self.add(loading);

		Ti.API.info("Running Test: PFUser Sign Up" );
		
		parseapi = require('com.forge42.parseapi');
		
		// PFUser objects inherit all the methods of PFObject
		var pfUser = parseapi.createPFUser();	// first create a pfUser object
		
		// initialize the signup process with credentials
		pfUser.initSignUp( {
							username: emailTextField.value,
							password: passwordTextField.value,
							email: emailTextField.value
						});
		
		// you can set objects just like PFObject before finishing the sign up process
		//pfUser.setObject("name", nameTextField.value);
		
		
		// Synchronous sign up function, logs you in after it finishes
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
		var result = pfUser.finishSignUp();
		
		if( result.succeeded ) {
		
			Ti.API.info("Successfully created a new user with id: " + pfUser.objectId);
			
			var user = parseapi.PFUserCurrentUser();
			
			Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
			
			Ti.App.Properties.setProperty('userID',parseapi.PFUserCurrentUser());
			Ti.App.Properties.setProperty('userName',user.objectForKey("name"));
			self.fireEvent('loggedIn',user);
			
			//do what we do for login
			
		
		} else {
			
			Ti.API.info("Could not create new user. ErrorCode: " + result.errorCode + " Error: " + result.error);
			if(result.error==202)
			{
				var msg = "This email already exists. Login directly or use the forgotten password screen.";
			}
			else
			{
				var msg = "We could not register this account. You can help by reporting this error:"+result.errorCode + ' ' + result.error;
			}
			alert(msg);
			signUpButton.show();
			loading.hide();
			
		}
		
		
	});
	
	self.add(titleLabel);
	self.add(nameLabel);
	self.add(nameTextField);
	self.add(label1);
	self.add(emailTextField);
	self.add(label2);
	self.add(passwordTextField);
	self.add(signUpButton);
	
	
	return self;
};

module.exports = RegisterView;