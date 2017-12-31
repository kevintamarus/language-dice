import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/dice-transparent.png')}
        style={{width: 100, height: 75}}/>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white', padding: 50}}>Language Dice</Text>
        <View>
          <Text style={{padding: 25, fontSize: 20,}}>Select Your Language:</Text>
          <Button
            raised
            backgroundColor="blue"
            icon={{name: 'language'}}
            title='French'
            onPress={() => Actions.settings()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});