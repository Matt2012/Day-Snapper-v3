function MasterView() {
	
	Ti.include('/lib/ti/global.js');
	
	var ActionBarView = require('/ui/common/shared/ActionBarView');
	
	var self = new ui.View({
		backgroundColor:'white'
	});
	
	var SnapView = require('/ui/common/snapsView/SnapsScrollableTableView');
	
	var snapsTable = new SnapView();
	
	self.SnapView = snapsTable;
	
	self.add(snapsTable);
	
	var topBar = new ActionBarView({
		pos: 'top',
		buttons: {
			btnSettings: {
				icon:'gear',
				width:40
			}
		}
	});

	self.add(topBar.viewProxy);
	
	topBar.addEventListener('buttonPress', function(e) {
		//var btnAction = e.id; (only one option)
		//open settings window
		var url = '/ui/common/settings/btnSettingsWindow';
		var masterModal = require(url);
		var w = new masterModal();
		
		w.addEventListener('loggedOut', function(user) {
			self.fireEvent('unauthenticated',user)
			return false;
		});
			
		w.open();
	});
	
	var bottomBar = new ActionBarView({
		pos: 'bottom',
		buttons: {
			btnAdd: {
				icon:'plus',
				width:80
			},
			btnSync: {
				icon:'sync',
				width:80
			},
			btnTags: {
				icon:'tag',
				width:80
			},
			btnSearch: {
				icon:'search',
				width:80
			}
		}
	});

	self.add(bottomBar.viewProxy);
	
	bottomBar.addEventListener('buttonPress', function(e) {

		var btnAction = e.id;
		if(btnAction == 'btnSearch')
		{
			alert('search coming soon..');
			//hide drop down
			
			//show search (add view)
			
			
		}
		else if(btnAction == 'btnSync')
		{
			alert('sync coming soon..');
			//check if network
			
			//---------------------------------------------start sync
			
			//start activity indicator
			
			//get latest update date from properties
			
			//download all changes from the date from cloud
			
			//show progress bar
			
			//grab all local changes from device
			
			//where same id in both list remove update with oldest date from that list
			
			//make local changes
			
			//make remote changes
			
			
		}
		else
		{
			//btnAction == 'btnTags' or btnAction == 'btnAdd'
			var url = (btnAction == 'btnAdd') ? '/ui/common/snapCrud/btnAddWindow' : '/ui/common/snapsView/btnTagsWindow';
			var masterModal = require(url);
			var w = masterModal();
			w.addEventListener('saveSnapAndRefresh_step3', function(newSnap) {
				snapsTable.fireEvent('saveSnapAndRefresh_step4',newSnap);
			});
			w.open();
		}
		
		

	});
	
	return self;
};

module.exports = MasterView;