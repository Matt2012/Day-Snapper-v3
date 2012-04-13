parseapi = require('com.forge42.parseapi');

exports.insertSnap = function(args) {
	
	Ti.API.info("-----------------------------------------------------starting insert or update");
	
	//check network
	//check wifi
	//check settings for when to sync
	
	//if has objectId use update;
	if(args.objectId==false)
	{
		var pfObject = parseapi.PFObjectCreateObjectWithClassName("SnapObject");
	}
	else
	{
		Ti.API.info('has an objectId so update---'+args.objectId+' '+JSON.stringify(args));
		
		return false;
		var pfObject = updateSnap(args.objectId);
		if(pfObject==false) return false;
	}
	
	// Text, numbers
	//var x = parseapi.PFUserCurrentUser(); //store this in TaffyDB??
	pfObject.setObject(args.title, "title");
	pfObject.setObject(args.category, "category");
	pfObject.setObject(new Date(args.dateCreated), "dateCreated");
	pfObject.setObject(new Date(args.dateUpdated), "dateUpdated");
	pfObject.setObject(new Date(args.dateFor), "dateFor");
	//(args.lastSynced) pfObject.setObject(new Date(args.lastSynced), "lastSynced");
	pfObject.setObject(parseapi.PFUserCurrentUser() , "user");
	pfObject.setObject(args.isPrivate, "isPrivate");
	pfObject.setObject(args.status, "status");
	
	//var created_object_id = -99;
	// Save Asynchronously.
	pfObject.saveInBackground( { 	
		success: function(e) {
			Ti.API.info("-----------------------------------------------------Success!");
			var created_object_id = pfObject.objectId;
			Ti.API.info("Created Object ID: " + created_object_id);
			//update taffydb with dateSynced and objectId
			//isSynced dateSynced
			return created_object_id;
		},
		error: function(e) {
			var created_object_id = false;
			Ti.API.info("-----------------------------------------------------Error: " + JSON.stringify(e));
			return created_object_id;
		}
	});
	//return false;
	
};

updateSnap = function(created_object_id) {
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("SnapObject");
	
	var result = pfQuery.getObjectWithId(created_object_id);
	
	if( result.succeeded ) {
	
		var pfObject = result.object; 
		
		return pfObject;
		
	} else {
		
		Ti.API.info("Could not get object to update ErrorCode: " + result.errorCode + " Error: " + result.error);
		
		return false;
	}
};	