import React from 'react';
import pluginCall from 'sketch-module-web-view/client';
import { Button, Checkbox, Switch, Radio, Icon } from 'antd';
import './index.less';
const CheckboxGroup = Checkbox.Group;
const RadioGroup    = Radio.Group;
const Options       = {
	Order : ['01 → 99', '99 → 01'],
	Rename: ['SymbolInstance', 'TextStyle', 'LayerStyle'],
	Format: ['CamelCase', 'CssStyle']
};
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state             = {
			PrefixNum         : true,
			Order             : Options.Order[0],
			Rename            : ['SymbolInstance', 'TextStyle'],
			Format            : Options.Format[0],
			SelectAllAtrboards: false
		};
		this.onChangeOrder     = this.onChangeOrder.bind(this);
		this.onChangePrefixNum = this.onChangePrefixNum.bind(this);
		this.onChangeRename    = this.onChangeRename.bind(this);
		this.onChangeFormat    = this.onChangeFormat.bind(this);
		this.onClick           = this.onClick.bind(this);
		this.openWeb           = this.openWeb.bind(this);
	}

	onChangeOrder(e) {
		this.setState({Order: e.target.value});
		console.log('Order = ', e.target.value);
	}

	onChangePrefixNum(e) {
		this.setState({PrefixNum: e});
		console.log('PrefixNum = ', e);
	}

	onChangeRename(e) {
		this.setState({Rename: e});
		console.log('Rename = ', e);
	}

	onChangeFormat(e) {
		this.setState({Format: e.target.value});
		console.log('Format = ', e.target.value);
	}

	onClick() {
		let callback = {
			PrefixNum: this.state.PrefixNum,
			Order    : this.state.Order === Options.Order[0],
			Rename   : this.state.Rename,
			Format   : this.state.Format === Options.Format[0]
		};
		pluginCall('onClick', JSON.stringify(callback));
		console.log('onClick = ', callback);
	};

	openWeb() {
		let web = 'https://github.com/canisminor1990/sketch-name-organizer';
		pluginCall('openWeb', web);
		console.log('openWeb = ', web);
	}

	render() {
		return (
			<div>
				<div className="ui-banner" style={{backgroundImage: `url(../assets/banner.png)`}}/>
				<div className="ui-body">
					<div className="ui-title">Name Organizer</div>
					<div className="ui-switch-block">
						<Switch
							size="small"
							defaultChecked={this.state.PrefixNum}
							onChange={this.onChangePrefixNum}
						/>
						<span>Prefix artboards with numbers</span>
					</div>
					<div className="ui-title">Sort Order</div>
					<RadioGroup
						options={Options.Order}
						onChange={this.onChangeOrder}
						defaultValue={this.state.Order}/>
					<div className="ui-title">Rename Layers</div>
					<CheckboxGroup
						options={Options.Rename}
						defaultValue={this.state.Rename}
						onChange={this.onChangeRename}
					/>
					<div className="ui-title">Rename Format</div>
					<RadioGroup
						options={Options.Format}
						onChange={this.onChangeFormat}
						defaultValue={this.state.Format}/>
					<div className="ui-button-block">
						<Button type="primary" size="large" onClick={this.onClick}>
							Rename & Sort
						</Button>
					</div>
					<div
						className="ui-footer"
						onClick={this.openWeb}
					>
						<Icon type="github"/><span>canisminor1990</span>
					</div>
				</div>
			</div>
		);
	}
}


