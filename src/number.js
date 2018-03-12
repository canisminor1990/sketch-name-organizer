import _ from 'lodash';

const removeNumber = (Artboards, option) => {
  console.log('Remove Num Start', option);
  _.forEach(Artboards, layer => {
    console.log('before', layer.name);
    layer.name = remove(layer.name, option);
    console.log('after', layer.name);
  });
  console.log('Remove Num Done');
};

const addNumber = (Artboards, option) => {
  console.log('Add Num Start', option);
  _.forEach(Artboards, (layer, index) => {
    console.log('before', layer.name);
    layer.name = `${index + 1}${option}${layer.name}`;
    console.log('after', layer.name);
  });
  console.log('Add Num Done');
};

export { removeNumber, addNumber };

function remove(name, option) {
  return _.drop(name.split(option)).join(option);
}
