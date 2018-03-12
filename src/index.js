import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import WebUI from 'sketch-module-web-view';
import { mapLayers, hex2NSColor, openURL } from './utils';
import rename from './rename';
import sortLayer from './sortLayer';
import { removeNumber } from './number';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export default context => {
  const document = sketch.getSelectedDocument();
  const panelID = 'sketch-name-organizer.panel';
  const { All, Artboards } = mapLayers(document.selectedPage);

  Artboards.sort((a, b) => {
    if (a.frame.x === b.frame.x) {
      return b.frame.x - a.frame.x;
    } else {
      return a.frame.y - b.frame.y;
    }
  });

  const panelUI = new WebUI(context, Panel, {
    identifier: panelID,
    x: 0,
    y: 0,
    width: 340,
    height: 624,
    title: 'Name Organizer',
    onlyShowCloseButton: true,
    background: hex2NSColor('83FFBB'),
    hideTitleBar: false,
    shouldKeepAround: true,
    resizable: false,
    handlers: {
      onRun: callback => {
        if (All.length === 0) return UI.alert('🖌 Name Organizer', `No Layer found ...`);

        const config = JSON.parse(callback);
        if (config.addNumChecked) removeNumber(Artboards, config.addNum);

        if (config.renameSwitch)
          rename(All, {
            handleSymbol: config.handleSymbolChecked,
            format: config.format,
            space: config.handleSymbolChecked,
          });

        if (Artboards.length === 0) return UI.alert('🖌 Name Organizer', `No Artboard found ...`);
        sortLayer(Artboards, {
          marginX: config.marginX,
          marginY: config.marginY,
          reorder: config.reorderSwitch,
          sort: config.sortSwitch,
          addNum: config.addNumChecked ? config.addNum : false,
        });
        UI.message(`🖌 Name Organizer: Done !`);
      },
      onRemove: callback => {
        if (Artboards.length === 0) return UI.alert('🖌 Name Organizer', `No Artboard found ...`);
        const config = JSON.parse(callback);
        if (config.addNum !== '') {
          removeNumber(Artboards, config.addNum);
        } else {
          return UI.alert('🖌 Name Organizer', `Order Number style is not set.`);
        }
        UI.message(`🖌 Name Organizer: Removed !`);
      },
      openWeb: url => openURL(url),
    },
  });
};
