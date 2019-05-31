import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header'
import WelcomeMessage from './components/Header/WelcomeMessage'
import Question from './components/Question/Question'
import House from './components/House/House'

const questions = [
  { id: 1, question: "what is your name", answered: false },
  { id: 2, question: "what is state of origin", answered: false },
  { id: 3, question: "what is your nationality", answered: false },
  { id: 4, question: "what is your hobby", answered: false },
  { id: 5, question: "what is your father's name", answered: false },
  { id: 6, question: "what is your childhood nickname", answered: false },
]
const houses = [
  { id: 1, name: 'Green House', color: 'green', bio: "best house to be" },
  { id: 2, name: 'Red House', color: 'red', bio: "best house to be" },
  { id: 3, name: 'Purple House', color: 'purple', bio: "best house to be" },
  { id: 4, name: 'Gold House', color: 'gold', bio: "best house to be" }
]

class App extends Component {

  state = {
    started: false,
    finished: false,
    currentQuestion: null,
    questions: questions,
    houses: houses,
    answer: '',
    assignedHouse: null
  }
  startHandler = () => {
    const [current] = this.unansweredQuestions();
    this.setState({ started: true, currentQuestion: current })
  }

  unansweredQuestions = () => {
    return this.state.questions.filter(q => {
      return !q.answered
    })
  }
  answerChangerHandler = async ({ target }) => {
    const value = target.value;
    await this.setState(state => {
      return {
        ...state,
        answer: value
      }
    })
  }
  submitAnswerHandler = async (event, id) => {
    event.preventDefault();
    if (this.state.answer) {
      const updatedQuestions = this.state.questions.map(question => {
        if (question.id === id) {
          return ({
            ...question,
            answered: true,
          });
        }
        return question;
      });
      await this.setState(state => ({ ...state, questions: updatedQuestions, answer: '' }))
      this.setNextQuestion()
    }
  }
  setNextQuestion = async () => {
    const unAnsweredQuestions = await this.unansweredQuestions();
    if (!unAnsweredQuestions.length) {
      const assignedHouseIndex = Math.floor(Math.random() * Math.floor(4));
      const assignedHouse = this.state.houses[assignedHouseIndex]
      await this.setState(state => ({
        ...state,
        started: false,
        finished: true,
        assignedHouse: assignedHouse
      }));
    } else {
      const current = this.randomize(unAnsweredQuestions);
      await this.setState(state => (
        {
          ...state,
          currentQuestion: current
        }
      ))
    }
  }
  randomize = (data) => {
    const index = Math.floor(Math.random() * Math.floor(data.length));
    return data[index];
  }
  render() {
    return (
      <div className="App">
        <Header />
        <WelcomeMessage startHandler={this.startHandler} showBtn={this.state.finished || this.state.started} />
        {this.state.finished && <House house={this.state.assignedHouse} />}
        {this.state.started && <Question
          question={this.state.currentQuestion}
          submitAnswer={this.submitAnswerHandler}
          answerChanged={this.answerChangerHandler}
          answer={this.state.answer}
        />
        }
      </div>
    );
  }
}

export default App;
