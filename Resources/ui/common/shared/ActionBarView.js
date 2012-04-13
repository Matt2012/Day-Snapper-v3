function ActionBarView(args) {
	
	Ti.include('/lib/ti/global.js');

	if(typeof args.pos !== 'undefined' && args.pos === 'top')
	{
		var labelColour = '#666';
		var barBorderTop = 43;
		
		var self = new ui.Component(new ui.View({
			height:44,
			backgroundColor:'#F1F1F1',
			top:0
		}));
	}
	else
	{
		args.pos = 'bottom';
		var labelColour = '#000000';
		var barBorderTop = 0;
		
		var self = new ui.Component(new ui.View({
			height:44,
			backgroundColor:'#F1F1F1',
			bottom:0
		}));
		
	}

	var barBorder = Ti.UI.createView({
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
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
			//add drop down picker here
			if(typeof args.type !== 'undefined' )
			{
				
				Ti.API.info("--------------------------Top Options: " + args.type);
				
				if(args.type=='MasterView')
				{
					//defaults to drop down
				}
				else
				{
					var tr = Ti.UI.create2DMatrix();
					tr = tr.rotate(353);
					
					windowLabel = new ui.Label(args.type, {
					  color:labelColour,
					  top:0,
					  left:0,
					  height:60,
					  font:{fontSize:42},
					  textAlign:'left',
					  transform:tr
					});
					self.add(windowLabel);
				}
			}
			else
			{
				self.add(new ui.ImageView('../../images/appc_white.png', {
					left:5,
					width:161,
					height:32
				}));
			}
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