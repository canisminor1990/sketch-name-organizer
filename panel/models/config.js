const defaultConfig = {
  // rename
  renameSwitch: true,
  format: 'CamelCase',
  handleSymbolChecked: true,
  spaceChecked: true,
  // reorder
  reorderSwitch: true,
  // sort
  sortSwitch: true,
  marginX: 50,
  marginY: 100,
  // addNum
  addNumChecked: true,
  addNum: ' | ',
};

const saveConfig = JSON.parse(localStorage.getItem('config'));

export default {
  namespace: 'config',

  state: {
    ...defaultConfig,
    ...saveConfig,
  },

  reducers: {
    updateSuccess(state, action) {
      const payload = action.payload;
      return { ...state, ...payload };
    },
    reset(state, action) {
      return { ...state, ...defaultConfig };
    },
  },

  effects: {
    *update(action, { put }) {
      const payload = action.payload;
      console.log('update', payload);
      yield put({ type: 'updateSuccess', payload });
    },
  },
};
