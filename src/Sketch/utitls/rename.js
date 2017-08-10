export default (layerName) => {
	let name = layerName.split(' ');
	name     = upperCase(name).join('').replace(/ /g, "").split('/');
	return upperCase(name).join(' / ')
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