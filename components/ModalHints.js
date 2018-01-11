import React from 'react';
import {Text, View, Modal} from 'react-native';
import {Button} from 'react-native-elements';

export default class ModalHistory extends React.Component {
  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.showModalHints} 
        onRequestClose={this.props.toggleModalHints}>
        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Hints</Text>
      </Modal>
    )
  }
}