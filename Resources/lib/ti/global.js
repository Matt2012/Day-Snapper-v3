// JavaScript Document

	var _ = require('/lib/thirdParty/underscore'),
	theme = require('/lib/ti/theme'),
	ui = require('/lib/ti/components'),
	parseapi = require('com.forge42.parseapi');
	
	Ti.API.info("module is => " + parseapi);

	var parse_module_debug_log = true;

	// Toggle Parse API Module Debugging Log Output
	parseapi.enableParseModuleDebugLog(parse_module_debug_log);
	
	//move config to include and use gitignore	
	parseapi.initParse( {
							applicationId: "q9LKm1Q0QwwuIIYw8uOLCZdS78mkuFprSpAIQ0gW",
	 						clientKey: "DMr6nSNnaH2nGhdf05AMTRjxmDSvng2Q4LnOYKsU"
						});	
	
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	function iconPath(icon,pos) 
	{
		var tabletExt = (isTablet) ? '@2x' : ''; 
		//var colour = (pos=='top') ? 'white' : 'grey' ;
		return '/images/glyph/grey/'+icon+tabletExt+'.png';
	}