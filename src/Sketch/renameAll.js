import rename from './utitls/rename';

const renameAll = (context,
                   Rename = ['SymbolInstance',
                             'TextStyle',
                             'LayerStyle'],
                   Format) => {
	let sketch = context.api();
	let doc    = context.document;
	let pages  = doc.pages();
	let Option = {
		SymbolInstance: ifExist(Rename, 'SymbolInstance'),
		TextStyle     : ifExist(Rename, 'TextStyle'),
		LayerStyle    : ifExist(Rename, 'LayerStyle')
	};
	
	let pages_loop = pages.objectEnumerator();
	
	while (page = pages_loop.nextObject()) {
		let artboards      = page.artboards();
		let artboards_loop = artboards.objectEnumerator();
		while (artboard = artboards_loop.nextObject()) {
			if (Option.SymbolInstance) renameInstanceRecursive(artboard.layers(), Format);
			if (Option.TextStyle) renameLayers(artboard.layers(), doc.documentData().layerTextStyles(), Format);
			if (Option.LayerStyle) renameLayers(artboard.layers(), doc.documentData().layerStyles(), Format);
		}
	}
	
	sketch.message('🖌 Rename Done!');
};

const renameInstanceRecursive = (layers, Format) => {
	processLayers(layers, layer => {
		try {
			layer.setName(rename(layer.symbolMaster().name(), Format));
		} catch (e) {
		}
	});
};

const renameLayers = (layers, document, Format) => {
	processLayers(layers, layer => {
		let sharedStyleID = layer.style().sharedObjectID();
		let allStyles     = document.objects();
		
		let styleSearchPredicate = NSPredicate.predicateWithFormat('objectID == %@', sharedStyleID);
		let filteredStyles       = allStyles.filteredArrayUsingPredicate(styleSearchPredicate);
		
		if (filteredStyles.length) layer.setName(rename(filteredStyles[0].name(), Format));
	});
};

const processLayers = (layers, callback) => {
	for (let i = 0; i < layers.count(); i++) {
		let layer = layers.objectAtIndex(i);
		if (layer.class() == 'MSLayerGroup') {
			processLayers(layer.layers(), callback);
		} else {
			try {
				callback(layer);
			} catch (e) {
			}
		}
	}
};

function ifExist(array, word) {
	return array.indexOf(word) >= 0;
}

export {
	renameAll
};