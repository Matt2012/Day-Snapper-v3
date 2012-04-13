function MasterView() {
	
var _ = require('../../lib/thirdParty/underscore'),
theme = require('../../lib/ti/theme'),
ui = require('../../lib/ti/components'),
ActionBarView = require('../../ui/common/ActionBarView');	
Titanium.include('../../lib/thirdParty/taffy.js');		
	
	
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});


var mySnapsDB = TAFFY( TAFFY.loadFlatFile('snapsLatest.json') );
var c = mySnapsDB().count();
Ti.API.info('-----------------------------------------------------count:'+ c);
//if first time
if (c<1 || !c) {		
	//some dummy data if empty
	var ar = [{"title":"My First Snap", "price":"1.00", "status":"live", "hasChild":true},
	{"title":"My First Audio Snap", "price":"1.50", "status":"live", "hasChild":true},
	{"title":"Camera Snap", "price":"2.50", "status":"live", "hasChild":true},
	{"title":"Video Snap", "price":"1.50", "status":"archive", "hasChild":true},
	{"title":"Gallery Snap", "price":"1.40", "status":"live", "hasChild":true},
	{"title":"Doo Bee Snap (Scooby Snack)", "price":"1.00", "status":"live", "hasChild":true}];
	var snaps = TAFFY ( ar );
   snaps.saveFlatFile('snapsLatest.json');
   Ti.API.info('fresh');
}
else
{
	Ti.API.info('not fresh');
	var d = new Date();
	var n = d.getTime();
	var newRow = [{"title":d, "price":c, "status":"live", "hasChild":true}];
	mySnapsDB.insert(newRow);
	mySnapsDB.saveFlatFile('snapsLatest.json');
}
var mySnapsDB = TAFFY( TAFFY.loadFlatFile('snapsLatest.json') );

var y = mySnapsDB({status:"live"}).get();
//var y = mySnapsDB().get();
	
	var table = Ti.UI.createTableView({
		data:y
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});
	
	
	var actionBar = new ActionBarView({
		buttons: {
			snap: {
				title:'Snap',
				width:80
			},
			settings: {
				icon:'../images/14-gear@2x.png',
				width:40
			}
		}
	});

	self.add(actionBar.viewProxy);
	
	actionBar.addEventListener('buttonPress', function(e) {
		var Window = (e.id === 'snap') ? require('/ui/SnapWindow') : require('/ui/SettingsWindow');
		var w = new Window();
		w.open();
	});
	
	return self;
};

module.exports = MasterView;