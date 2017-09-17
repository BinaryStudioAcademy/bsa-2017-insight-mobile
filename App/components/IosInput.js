import React, { Component } from 'react';
import {
	TextInput,
	Text,
	StyleSheet,
} from 'react-native';

class IosInput extends Component {
	render() {
		return (
			<TextInput
				style={styles.input}
				placeholder={this.props.placeholder}
				onChangeText={this.props.onChangeText}
				value={this.props.value}
				secureTextEntry={this.props.secureTextEntry}
			/>
		)
	}
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#eee',
		borderRadius: 7,
		padding: 10,
		margin: 5,
		width: 200,
	},
});

export default IosInput;
