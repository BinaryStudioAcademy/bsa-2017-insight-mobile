import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	Text,
	SectionList,
	FlatList,
	Image,
} from 'react-native';

class UserInfo extends Component {
	render() {
		const statistic = this.props.statistics;
		const user = statistic && statistic.userId;
		const lastUrl = statistic && statistic.viewedUrls.join(' , ');
		const screen = statistic && `${statistic.screenWidth} x ${statistic.screenHeight}`;
		return (
			<View style={styles.view}>
				{user ? <FlatList
						data={[
							{ title: 'Username', info: user.username },
							{ title: 'Location', info: `${statistic.country}, ${statistic.city}` },
							{ title: 'Timezone', info: statistic.timeZone },
							{ title: 'Email', info: user.email },
							{ title: 'Phone', info: user.phone },
							{ title: 'Current URL', info: statistic.currentUrl },
							{ title: 'IP', info: statistic.userIpAddress },
							{ title: 'Browser', info: statistic.browser },
							{ title: 'Browser lang', info: statistic.browserLanguage },
							{ title: 'Device type', info: statistic.deviceType },
							{ title: 'OS', info: statistic.os },
							{ title: 'Screen', info: screen },
						]}
						renderItem={(data) => {
							if (data.item.info) {
								return (<View style={styles.listItem}>
									<Text style={styles.listItemTitle}>{data.item.title}</Text><Text>{data.item.info}</Text>
								</View>);
							}
						}}
					/> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		height: Dimensions.get('window').height,
		padding: 10,
	},
	listItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingVertical: 10,
	},
	listItemTitle: {
		fontWeight: 'bold',
		marginBottom: 3,
	}
});

export default UserInfo;