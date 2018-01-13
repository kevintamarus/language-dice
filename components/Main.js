import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Beginner from '../data/beginner';
import Intermediate from '../data/intermediate';
import Advanced from '../data/advanced';
import Randomizer from 'react-randomizer';
//Imported Components
import CardDisplay from './CardDisplay';
import ModalHistory from './ModalHistory';
import ModalHints from './ModalHints';
import ModalWebView from'./ModalWebView';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      remainingQuestions: [],
      previousQuestions: [],
      currentQuestion: null,
      currentIndex: 0,
      showTranslation: false,
      showModalHistory: false, showModalHints: false, showModalWebView: false
    }
  }

  componentWillMount() {
    let questions;
    if(this.props.difficulty === 'all') {
      questions = Randomizer.randomizeArray(Beginner.concat(Intermediate, Advanced));
    } else if(this.props.difficulty === 'beginner') {
      questions = Randomizer.randomizeArray(Beginner);
    } else if(this.props.difficulty === 'intermediate') {
      questions = Randomizer.randomizeArray(Intermediate);
    } else if(this.props.difficulty === 'advanced') {
      questions = Randomizer.randomizeArray(Advanced);
    }
    const currentQuestion = questions[0];
    const remainingQuestions = questions.slice(1);
    this.setState({
      questions, 
      remainingQuestions, 
      currentQuestion,
      previousQuestions: [currentQuestion]
    });
  }

  randomQuestion = () => {
    const newPrevious = this.state.previousQuestions.concat([this.state.remainingQuestions[0]]);
    const currentQuestion = this.state.remainingQuestions[0];
    this.setState({
      previousQuestions: newPrevious,
      currentIndex: newPrevious.length - 1,
      currentQuestion,
      showTranslation: false
    });
    if(this.state.remainingQuestions.length === 1) {
      const randomized = Randomizer.randomizeArray(this.state.questions);
      this.setState({remainingQuestions: randomized});
    } else {
      const newRemaining = this.state.remainingQuestions.slice(1);
      this.setState({remainingQuestions: newRemaining});
    }
  }

  handleTraverse = buttonIndex => {
    const currentIndex = this.state.currentIndex;
    if(buttonIndex === 0 && currentIndex !== 0) {
      this.traverseQuestions('previous');
    }
    if(buttonIndex === 1) {
      this.toggleModal('History');
    }
    if(buttonIndex === 2) {
      if(currentIndex !== this.state.previousQuestions.length - 1) {
        this.traverseQuestions('next');
      } else {
        this.randomQuestion();
      }
    }
  }

  traverseQuestions = action => {
    let newIndex;
    if(action === 'previous') {
      newIndex = this.state.currentIndex - 1;
    } else if(action === 'next') {
      newIndex = this.state.currentIndex + 1;
    } else {
      newIndex = action;
    }
    this.setState({
      currentQuestion: this.state.previousQuestions[newIndex],
      currentIndex: newIndex
    });
  }

  toggleTranslation = () => {
    this.setState({showTranslation: !this.state.showTranslation});
  }

  toggleModal = name => {
    this.setState({['showModal' + name]: !this.state['showModal' + name]});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/background.jpeg')}
          style={{flex: 1, position: 'absolute'}}
        />
        <ButtonGroup
          buttons={
            this.state.currentIndex === this.state.previousQuestions.length - 1 ? 
            ['Previous', 'View History', 'Generate Next'] : ['Previous', 'View History', 'Next']
          }
          selectedBackgroundColor="blue"
          onPress={this.handleTraverse}
        />
        <CardDisplay
          currentIndex={this.state.currentIndex}
          currentQuestion={this.state.currentQuestion}
          showTranslation={this.state.showTranslation}
          toggleTranslation={this.toggleTranslation}
          toggleModal={this.toggleModal}
          handleTraverse={this.handleTraverse}
        />
        <View style={{paddingTop: 5}}>
          <Button
            raised
            backgroundColor="green"
            borderRadius={10}
            icon={{name: 'autorenew'}}
            title='Generate Another Question'
            onPress={this.randomQuestion}
          />
        </View>
        <View style={{paddingTop: 5}}>
          <Button
            raised
            backgroundColor="orange"
            borderRadius={10}
            title='Use Google Translate'
            onPress={() => this.toggleModal('WebView')}
          />
        </View>
        <View style={{paddingTop: 5}}>
          <Button
            raised
            backgroundColor="#6495ED"
            icon={{name: 'home'}}
            title='Back to Home'
            onPress={() => Actions.root()}
          />
        </View>
        <ModalHistory 
          showModalHistory={this.state.showModalHistory} 
          toggleModal={this.toggleModal}
          previousQuestions={this.state.previousQuestions}
          traverseQuestions={this.traverseQuestions}
          currentIndex={this.state.currentIndex}
        />
        <ModalHints 
          showModalHints={this.state.showModalHints} 
          toggleModal={this.toggleModal}
          previousQuestions={this.state.previousQuestions}
          currentIndex={this.state.currentIndex}
        />
        <ModalWebView 
          showModalWebView={this.state.showModalWebView}
          toggleModal={this.toggleModal}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});