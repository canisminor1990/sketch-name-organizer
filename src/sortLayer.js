import { Rectangle } from 'sketch/dom';
import _ from 'lodash';
import { addNumber } from './number';

export default (
  Artboards,
  option = {
    marginX: 50,
    marginY: 100,
    reorder: true,
    sort: true,
    addNum: ' | ',
  }
) => {
  const sortedArtboards = _.sortBy(Artboards, ['frame.y', 'frame.x']);
  const minX = _.sortBy(Artboards, ['frame.x'])[0].frame.x;
  let ArtboardsGroup = {};

  console.log('Sort Start');

  // add order number
  if (option.addNum) addNumber(sortedArtboards, option.addNum);

  console.log('Add Num');

  _.forEach(sortedArtboards, layer => {
    // set layer order
    if (option.reorder) layer.moveToBack();

    // set rect
    if (option.sort) {
      const isFirstGroup = Object.keys(ArtboardsGroup).length === 0;
      let isFirstChild = false;
      const Y = layer.frame.y;

      if (!ArtboardsGroup[Y]) {
        isFirstChild = true;

        ArtboardsGroup[Y] = {
          index: 0,
          y: Y,
          maxHeight: layer.frame.height,
          children: [],
        };

        if (!isFirstGroup) {
          const index = Object.keys(ArtboardsGroup).length - 1;
          const preGroupKey = Object.keys(ArtboardsGroup)[index - 1];
          const preGroup = ArtboardsGroup[preGroupKey];
          ArtboardsGroup[Y].index = index;
          ArtboardsGroup[Y].y = preGroup.y + preGroup.maxHeight + parseFloat(option.marginY);
        }
      }

      const Group = ArtboardsGroup[Y];
      const rect = new Rectangle(layer.frame);
      if (rect.height > Group.maxHeight) Group.maxHeight = rect.height;
      if (!isFirstChild) {
        const LastChild = _.last(Group.children).frame;
        rect.x = LastChild.x + LastChild.width + parseFloat(option.marginX);
      } else {
        rect.x = minX;
      }
      rect.y = Group.y;
      layer.frame = rect;
      ArtboardsGroup[Y].children.push(layer);
    }
  });

  console.log('Sort Done');
};
