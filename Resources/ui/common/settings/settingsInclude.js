// JavaScript Document

function textSettingWindow(opts, self)
{
	var ActionBarView = require('/ui/common/shared/ActionBarView');
	
	var textWin = Titanium.UI.createWindow({
		modal:true,
		navBarHidden:true,
		backgroundColor:'#fff'
	});
	
	var topBar = new ActionBarView({
		type:opts.winTitle,
		pos: 'top'
	});

	textWin.add(topBar.viewProxy);

	 var label = Ti.UI.createLabel({
		top: 55, left: 10, right: 10, height:40,
		text : opts.tfLabel,
		color: 'black'
	});
	textWin.add(label);

	var tf1 = Ti.UI.createTextField({
		value: Titanium.App.Properties.getString(opts.tfValue, ''),
		keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
		top: 100, left: 10, right: 10, height:40
	});
	textWin.add(tf1);

	var btn = Ti.UI.createButton({
		title: 'Close',
		top: 150, left: 10, right: 10, height:40
	});

	btn.addEventListener("click", function(e) {
		if(opts.updateID)
		{
			self.myDesc[ opts.updateID ].text = tf1.value;
		}
		Titanium.App.Properties.setString(opts.tfValue, tf1.value);
		textWin.close();
	});
	textWin.add(btn);

	textWin.open({animated:true});
}



var roadmap = '  \n\
  \n\
To Do   \n\
   \n\
Add all this to Road Plan in app.   \n\
  \n\
Stage 1: Early Alpha: Share with Greg April  \n\
  \n\
Edit  \n\
  \n\
Delete  \n\
  \n\
Sync  \n\
  \n\
Add  \n\
  \n\
Geolocation  \n\
  \n\
Add Camera Snap, Video Snap, Audio Snap, Gallery Snap  \n\
   \n\
  \n\
Stage 2: Actual Alpha: Share with Greg: May 1st  \n\
  \n\
Add tags  \n\
  \n\
Change Date / Geolocation  \n\
  \n\
Archive  \n\
  \n\
Sort  \n\
  \n\
Tag Search  \n\
  \n\
Date Search  \n\
  \n\
Doo Bee Snap  \n\
  \n\
Stage 3: Beta 1: Share with User Group Greg / Tinge / Nadia / Simon / Dom*3: Mid May  \n\
  \n\
Early iPhone and iPad version  \n\
  \n\
Text Search Blog Snap (first integration e.g. Blogger.com)  \n\
  \n\
Share on Facebook / Twitter  \n\
   \n\
Stage 4: Beta 2: Share with User Group Greg / Tinge / Nadia / Simon / Dom*3: June 1st  \n\
  \n\
Friend Feeds, Public Tag Feeds  \n\
  \n\
Map View  \n\
  \n\
Gallery View  \n\
';
