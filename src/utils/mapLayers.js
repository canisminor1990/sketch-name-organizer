import _ from 'lodash';

export default page => {
  const All = [];
  const Artboards = [];

  const mapLayers = layers => {
    _.forEach(layers, layer => {
      All.push(layer);
      if (layer.type === 'Artboard') Artboards.push(layer);
      if (layer.layers) {
        mapLayers(layer.layers);
      }
    });
  };

  mapLayers(page.layers);

  return {
    All,
    Artboards,
  };
};
