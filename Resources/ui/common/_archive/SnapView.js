function SnapView() {
	
	var _ = require('../../lib/thirdParty/underscore'),
	theme = require('../../lib/ti/theme'),
	ui = require('../../lib/ti/components');	
	Titanium.include('../../lib/thirdParty/taffy.js');		
		
	
	var self = Ti.UI.createView({
		backgroundColor:'#FFFFFF',
		top:44,
		height:375
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
		data:y,
		height:375,
		color:'#999'
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		//alert(e.rowData.title);
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});
	
	return self;
};

module.exports = SnapView;