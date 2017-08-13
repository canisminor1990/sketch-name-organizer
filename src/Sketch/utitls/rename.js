export default (layerName, Format = true) => {
	let name = layerName.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase());
	name     = upperCase(name.split(' ')).join('').replace(/ /g, "").split('/');
	if (Format) {
		return upperCase(name).join(' / ')
	} else {
		return upperCase(name).join(' / ')
			.replace(/([A-Z])/g, "-$1")
			.toLowerCase()
			.replace(/^\-/, "")
			.replace(/\:\-/g, ":")
			.replace(/ \-/g, " ")
	}
}

function upperCase(name) {
	for (var i = 0, newArr = [], sumArr = []; i < name.length; i++) {
		let news = name[i][0].toUpperCase();
		newArr.push(news);
		let sums = name[i].slice(1);
		sumArr.push(sums);
		name[i] = newArr[i] + sumArr[i];
	}
	return name
}