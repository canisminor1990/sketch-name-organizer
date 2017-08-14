import {sortArtboards} from './sortArtboards';
import {renameAll} from './renameAll';
import WebUI from 'sketch-module-web-view';

const panel = (context) => {
	let sketch  = context.api();
	const webUI = new WebUI(context, 'panel/index.html', {
		identifier         : 'name-organizer',
		x                  : 0,
		y                  : 0,
		width              : 340,
		height             : 532,
		onlyShowCloseButton: true,
		background         : hexToNSColor('83FFBB'),
		title              : ' ',
		hideTitleBar       : false,
		shouldKeepAround   : true,
		handlers           : {
			onClick: (callback) => {
				try {
					let config = JSON.parse(callback);
					sortArtboards(context, config.PrefixNum, config.Order, config.Format);
					if (config.Rename.length > 0) {
					
						renameAll(context, config.Rename, config.Format)
					}
					;
				} catch (e) {
					sketch.alert(e, 'Debug');
				}
			},
			openWeb: (url) => {
				NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
			}
		}
	});
};

function hexToNSColor(hex) {
	var r = parseInt(hex.substring(0, 2), 16) / 255,
	    g = parseInt(hex.substring(2, 4), 16) / 255,
	    b = parseInt(hex.substring(4, 6), 16) / 255,
	    a = 1;
	return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
}

const removeNumber = context => sortArtboards(context, false);

export {
	panel,
	sortArtboards,
	removeNumber,
	renameAll
};