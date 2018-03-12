import { Component } from 'react';

class Tab extends Component {}

Tab.State = state => ({
  ...state,
});

Tab.Func = dispatch => ({
  update(data, type = 'config') {
    dispatch({ type: `${type}/update`, payload: data });
  },
  reset() {
    dispatch({ type: `config/reset` });
    dispatch({ type: `layers/reset` });
  },
});

export default Tab;
