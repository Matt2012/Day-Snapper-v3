function ActionBarView(args) {
	
	Ti.include('../../../lib/ti/global.js');
	
	if(typeof args.pos !== undefined && args.pos === 'top')
	{
		var self = new ui.Component(new ui.View({
			height:44,
			top:0,
			backgroundImage:'../../images/sliver.png'
		}));
		var labelColour = '#FFFFFF';
		var barBorderTop = 42;
	}
	else
	{
		args.pos = 'bottom';
		
		var labelColour = '#000000';
		var barBorderTop = 0;
	}
	
	var self = new ui.Component(new ui.View({
			height:44,
			bottom:0,
			backgroundColor:'#F1F1F1'
		}));
	
	
	var barBorder = Ti.UI.createView({
        height: 2,
        width: '100%',
        backgroundColor: '#000',
        top:barBorderTop
    });
    self.add(barBorder);
	
	

	
	//title label or image if none provided
	if (args.title) {
		self.add(new ui.Label(args.title, _.extend({
			left:5
		},theme.headerText)));
	}
	else {
		if(args.pos=='top')
		{
		self.add(new ui.ImageView('../../images/appc_white.png', {
			left:5
		}));
		}
	}
	
	var buttonOffset = 0;
	for (var buttonId in args.buttons) {
		var buttonData = args.buttons[buttonId];
		
		var btnLabel, btnImage, button = new ui.View({
			width:buttonData.width,
			right:buttonOffset,
		});
		
		if (buttonData.title) {
			btnLabel = new ui.Label(buttonData.title, {
				color:labelColour,
				height:'auto',
				width:'auto',
				font: {
					fontSize:14,
					fontWeight:'bold'
				}
			});
			button.add(btnLabel);
		}
		else if (buttonData.icon) {
			var btnImage = new ui.ImageView(iconPath(buttonData.icon,args.pos),{
				height:20,
				width:20
			});
			button.add(btnImage);
		}
		
		self.add(button);
		
		if(args.pos=='top')
		{
			self.add(new ui.View({
				backgroundColor:'#dedede',
				width:1,
				height:42,
				right:buttonOffset+buttonData.width
			}));
		}
		
		(function(id, btn) {
			btn.addEventListener('click', function() {
				self.fireEvent('buttonPress', {
					id:id
				});
			});
		})(buttonId, button);
		
		buttonOffset = buttonOffset+buttonData.width;
	}
	
	return self;
}

module.exports = ActionBarView;