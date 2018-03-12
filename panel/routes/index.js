import pluginCall from 'sketch-module-web-view/client';
import { connect } from 'dva';
import { Component } from 'react';
import { Button, message } from 'antd';
import { Copyright } from '../components';
import Tab from './Tab';
import Artboard from './Artboard';
import style from './index.scss';

class WebView extends Component {
  FootBar = () => (
    <div className={style.footbar}>
      <div className={style.btnGroup}>
        <Button onClick={this.onGetRemoveClick} className={style.getBtn}>
          Remove No.
        </Button>
        <Button onClick={this.onRunBtnClick} type="primary" className={style.submitBtn}>
          Run
        </Button>
      </div>
      <Copyright src="https://github.com/canisminor1990/sketch-select" />
    </div>
  );

  ResetBtn = () => (
    <Button onClick={this.onReset} className={style.resetBtn} size="small" ghost>
      Reset
    </Button>
  );

  render() {
    return (
      <div className={style.view}>
        <div className={style.banner} style={{ backgroundImage: `url(banner.png)` }}>
          <this.ResetBtn />
        </div>
        <Artboard />
        <this.FootBar />
      </div>
    );
  }

  onReset = () => {
    this.props.reset();
    message.success(`Reset Success`);
  };

  onGetRemoveClick = () => {
    const Data = JSON.stringify(this.props.config);
    console.log('RemoveBtn Click', Data);
    pluginCall('onRemove', Data);
  };

  onRunBtnClick = () => {
    const Data = JSON.stringify(this.props.config);
    console.log('RunBtn Click', Data);
    localStorage.setItem('config', Data);
    pluginCall('onRun', Data);
  };
}

export default connect(Tab.State, Tab.Func)(WebView);
