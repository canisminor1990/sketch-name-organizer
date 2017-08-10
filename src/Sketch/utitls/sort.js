const sortAll = (context, isAscending = false) => {
	var selection = context.document.currentPage().artboards();
	var moveBack  = sendActionTimes.bind(null, context, 'moveBackward:')
	getSteps(selection, sortLayers(selection, isAscending))
		.forEach(steps => moveBack(steps.layer, steps.steps))
}

function moveObject(array, atIndex, toIndex) {
	if (atIndex !== toIndex) {
		let object = array.objectAtIndex(atIndex).retain().autorelease()
		array.removeObjectAtIndex(atIndex)
		array.insertObject_atIndex(object, toIndex)
	}
	return array
}

function sendActionTimes(context, action, object, times) {
	let doc            = context.document
	let page           = doc.currentPage()
	let selection      = context.selection
	let selectedLayers = selection.mutableCopy()
	page.changeSelectionBySelectingLayers(nil)
	for (let i = 0; i < times; i++) {
		MSLayerMovement.moveBackward([object])
	}
	page.changeSelectionBySelectingLayers(selectedLayers)
}

function sortLayers(layers, isAscending) {
	let sortDescriptor = NSSortDescriptor.sortDescriptorWithKey_ascending_selector(
		'name',
		isAscending,
		'localizedStandardCompare:'
	)
	return layers.sortedArrayUsingDescriptors([sortDescriptor])
}

function getSteps(selection, sortedLayers) {
	let steps          = []
	let selectedLayers = selection.mutableCopy()
	for (let i = 0; i < sortedLayers.count(); i++) {
		let layer = sortedLayers.objectAtIndex(i)
		let index = selectedLayers.indexOfObject(layer)
		steps.push({layer: layer, steps: index - i})
		selectedLayers = moveObject(selectedLayers, index, i)
	}
	return steps
}

export default sortAll