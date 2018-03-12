import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import './index.scss';

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  },
});

// 2. Models
app.model(require('./models/config').default);

// 2. Plugins
app.use(createLoading());

// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');

// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', e => e.preventDefault());
