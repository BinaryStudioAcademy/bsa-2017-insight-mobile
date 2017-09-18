import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Drawer from 'react-native-drawer';
import { getStatisticById } from '../actions/statisticActions';

class UserInfoDrawer extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: true,
		}
	}

	componentWillMount() {
		this.props.getUserStatistics(this.props.userId);
	}

	render() {
		return (
			<Drawer
			  open={this.state.isOpen}
				openDrawerOffset={0.2}
				side="right"
				type="overlay"
  			tapToClose={true}
				panOpenMask={.2}
				styles={styles}
				content={
					<View>
						<Text>Drawer</Text>
						<Text>Drawer</Text>
						<Text>Drawer</Text>
						<Text>Drawer</Text>
						<Text>Drawer</Text>
						<Text>Drawer</Text>
					</View>
				}
			>
				{this.props.children}
			</Drawer>
		)
	}
}

const styles = {
	drawer: {
		shadowColor: '#000000',
		shadowOpacity: 0.8,
		shadowRadius: 3,
		backgroundColor: '#fff',
	},
	view: {
		height: Dimensions.get('window').height,
	}
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

// export default UserInfoDrawer;

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDrawer);