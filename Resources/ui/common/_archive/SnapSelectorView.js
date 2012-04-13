function SnapSelectorView() {
	
	Ti.include('../../../lib/ti/global.js');
	var ActionBarView = require('../../ui/common/ActionBarView');
	
	var self = new ui.View({
		backgroundColor:'white'
	});
	
	var SnapSelectorListView = require('../../ui/common/SnapSelectorScrollableTableView');
	
	var snapSelectorListTable = new SnapSelectorListView();
	
	self.SnapView = snapSelectorListTable;
	
	self.add(snapSelectorListTable);
	
	var topBar = new ActionBarView({
		pos: 'top'
	});

	self.add(topBar.viewProxy);
	
	topBar.addEventListener('buttonPress', function(e) {
		alert(e.id);
		//open settings window
	});
	
	var bottomBar = new ActionBarView({
		pos: 'bottom',
		buttons: {
			btnNote: {
				icon:'note',
				width:80
			},
			btnRefresh: {
				icon:'camera',
				width:80
			},
			btnTags: {
				icon:'voice',
				width:80
			},
			btnSearch: {
				icon:'video',
				width:80
			}
		}
	});

	self.add(bottomBar.viewProxy);
	
	bottomBar.addEventListener('buttonPress', function(e) {

		var btnAction = e.id;
		
		Ti.include('../../ui/common/selectorActions.js');

	});
	
	return SnapSelectorView;
};

module.exports = MasterView;