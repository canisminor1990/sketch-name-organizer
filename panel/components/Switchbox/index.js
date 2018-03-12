import { Switch } from 'antd';
import { connect } from 'dva';
import style from './index.scss';

const State = ({ config }) => ({ config });

const Switchbox = ({ dispatch, config, title, type, size }) => {
  const update = (data, type = 'config') => {
    dispatch({ type: `${type}/update`, payload: data });
  };
  const onSwitch = (checked, type) => {
    update({ [`${type}Switch`]: checked }, 'config');
  };

  return (
    <div className={size === 'small' ? style.small : style.header}>
      <span className={style.title}>{title}</span>
      <Switch checked={config[`${type}Switch`]} size={size} onChange={e => onSwitch(e, type)} />
    </div>
  );
};

export default connect(State)(Switchbox);
