import sketch from 'sketch/dom';
import UI from 'sketch/ui';
import WebUI from 'sketch-module-web-view';
import { hex2NSColor, openURL } from './utils';

const isDev = process.env.NODE_ENV === 'development';
const Panel = isDev ? 'http://localhost:8000' : 'index.html';

export default context => {
  const document = sketch.getSelectedDocument();
  const panelID = 'sketch-name-organizer.panel';

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
      select: callback => {},
      getSelection() {},
      openWeb: url => openURL(url),
    },
  });
};
