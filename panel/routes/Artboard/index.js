import Tab from '../Tab';
import { connect } from 'dva';
import { Select } from 'antd';
import { Switchbox, Selection } from '../../components';
import style from '../index.scss';

const Option = Select.Option;

class Page extends Tab {
  NameFormat = () => (
    <div>
      <Switchbox title="Name Format" type="rename" />
      <div className={style.select}>
        <div>Format Style:</div>
        <Select
          defaultValue="CamelCase"
          style={{ width: 120 }}
          onChange={e => this.props.update({ format: e })}
        >
          <Option value="CamelCase">CamelCase</Option>
          <Option value="camelCase">camelCase</Option>
          <Option value="kebabCase">kebab-case</Option>
          <Option value="snakeCase">snake_case</Option>
          <Option value="startCase">Start Case</Option>
        </Select>
      </div>
      <Selection title="Rename Symbol as MasterSymbol" type="handleSymbol" noInput />
      <Selection title="Add spacing: foo / bar" type="space" noInput />
    </div>
  );

  Reorder = () => (
    <div>
      <Switchbox title="Reorder Artboards" type="reorder" />
      <Selection title="Order No." type="addNum" />
    </div>
  );
  Sort = () => (
    <div>
      <Switchbox title="Sort Artboards" type="sort" />
      <Selection title="Margin X" type="marginX" noSelect />
      <Selection title="Margin Y" type="marginY" noSelect />
    </div>
  );

  render() {
    return (
      <div className={style.container}>
        <this.NameFormat />
        <br />
        <this.Reorder />
        <br />
        <this.Sort />
      </div>
    );
  }
}

export default connect(Tab.State, Tab.Func)(Page);
