import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {Button, Card, ButtonGroup} from 'react-native-elements';

export default class CardDisplay extends React.Component {
  render() {
    return (
      <Card
        containerStyle={styles.card}
        title={!this.props.showTranslation ? `Question #${this.props.currentIndex + 1}` : `Question #${this.props.currentIndex + 1} Translated`}
        titleStyle={{color: 'white', fontSize: 20}}
        image={require('../assets/question-mark.png')}
        imageStyle={{width: 75, height: 75}}
        imageWrapperStyle={{alignItems: 'center'}}>
        { !this.props.showTranslation ? 
          <Text style={styles.cardText}>
            {this.props.currentQuestion ? this.props.currentQuestion.question : null}
          </Text> :
          <Text style={styles.cardText}>
            {this.props.currentQuestion ? this.props.currentQuestion.translation : null}
          </Text>
        }
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 300, 
    height: 290,
    backgroundColor:'rgba(52, 52, 52, 0.1)'
  },
  cardText: {
    marginBottom: 10,
    color: 'white',
    fontSize: 30, 
    fontWeight: 'bold'
  }
});