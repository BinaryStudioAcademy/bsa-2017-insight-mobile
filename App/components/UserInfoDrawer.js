import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
} from 'react-native';
import Drawer from 'react-native-drawer';
import { getStatisticById } from '../actions/statisticActions';
import UserInfo from './UserInfo';

class UserInfoDrawer extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
		}
	}

	componentWillMount() {
		this.props.getUserStatistics(this.props.userId);
	}

	render() {
		return (
			<Drawer
			  open={this.state.isOpen}
				openDrawerOffset={0.3}
				closedDrawerOffset={-3}
				side="right"
				type="overlay"
  			tapToClose={true}
				panOpenMask={.2}
				styles={drawerStyles}
				content={
					<UserInfo	statistics={this.props.userInfo} />
				}
			>
				{this.props.children}
			</Drawer>
		)
	}
}

const drawerStyles = {
	drawer: {
		shadowColor: '#ccc',
		shadowOpacity: 0.3,
		shadowRadius: 4,
		backgroundColor: '#fff',
	},
};

const mapStateToProps = (state) => {
	return {
		userInfo: state.statistics.userStatistics,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserStatistics: (id) => {
			dispatch(getStatisticById(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDrawer);