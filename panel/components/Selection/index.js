import { Checkbox, Input } from 'antd';
import { connect } from 'dva';
import style from './index.scss';

const State = ({ config }) => ({ config });

const Selection = ({ dispatch, config, title, type, noSelect, noInput }) => {
  const update = (data, type = 'config') => {
    dispatch({ type: `${type}/update`, payload: data });
  };
  const onCheck = (e, type) => {
    const checked = e.target.checked;
    update({ [`${type}Checked`]: checked }, 'config');
  };
  const onInputChange = (e, type) => {
    const value = e.target.value;
    update({ [type]: value }, 'config');
  };

  if (noSelect) {
    return (
      <div className={style.selection}>
        <Input addonBefore={title} value={config[type]} onChange={e => onInputChange(e, type)} />
      </div>
    );
  } else {
    return (
      <Checkbox
        className={style.selection}
        checked={config[`${type}Checked`]}
        onChange={e => onCheck(e, type)}
      >
        {noInput ? (
          <span className={style.desc}>{title}</span>
        ) : (
          <Input addonBefore={title} value={config[type]} onChange={e => onInputChange(e, type)} />
        )}
      </Checkbox>
    );
  }
};

export default connect(State)(Selection);
