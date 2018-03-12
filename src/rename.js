import _ from 'lodash';

export default (
  AllLayers,
  option = {
    handleSymbol: true,
    format: 'CamelCase',
    space: true,
  }
) => {
  _.forEach(AllLayers, layer => {
    if (option.handleSymbol && layer.master) {
      const newName = formatName(layer.master.name, option.format, option.space);
      layer.master.name = newName;
      layer.name = newName;
    } else {
      layer.name = formatName(layer.name, option.format, option.space);
    }
  });
};

function formatName(name, format, space) {
  let Name = name.replace(/([ ]+|)\/([ ]+|)/g, '/').split(/\//g);
  _.forEach(Name, (str, i) => {
    switch (format) {
      case 'CamelCase':
        Name[i] = _.upperFirst(_.camelCase(str));
        break;
      case 'camelCase':
        Name[i] = _.camelCase(str);
        break;
      case 'kebabCase':
        Name[i] = _.kebabCase(str);
        break;
      case 'snakeCase':
        Name[i] = _.snakeCase(str);
        break;
      case 'startCase':
        Name[i] = _.startCase(str);
        break;
    }
  });

  Name = Name.join(space ? ' / ' : '/');
  return Name;
}
