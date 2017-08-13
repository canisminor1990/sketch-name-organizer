import rename from './utitls/rename';
import sortAll from './utitls/sort';
const sortArtboards = (context, PrefixNum = true, Order = true) => {
	
	let sketch        = context.api();
	let doc           = context.document;
	let artboards     = Array();
	let pageArtboards = doc.currentPage().artboards();
	
	const removeNum = (name) => name.replace(/[0-9]+\:/, '');
	
	for (var i = 0; i < pageArtboards.count(); i++) {
		artboards[i] = pageArtboards[i];
	}
	
	artboards.sort((a, b) => a.frame().x() - b.frame().x());
	artboards.sort((a, b) => a.frame().y() - b.frame().y());
	
	for (let i = 0; i < pageArtboards.count(); i++) {
		let oldName = artboards[i].name().toString();
		oldName     = removeNum(oldName);
		oldName     = rename(oldName);
		let number  = (i <= 8) ? '0' + (i + 1).toString() : (i + 1).toString();
		let name    = number + ':' + oldName;
		artboards[i].setName(name);
	}
	sketch.message(`🖌 Rename & Sort: ${i} Artboards`);
	try {
		sortAll(context, !Order);
	} catch (e) {
		sketch.alert(e, 'Debug');
	}
	if (!PrefixNum) {
		for (var i = 0; i < pageArtboards.count(); i++) {
			pageArtboards[i].setName(removeNum(pageArtboards[i].name().toString()));
		}
	}
};

export {
	sortArtboards
};