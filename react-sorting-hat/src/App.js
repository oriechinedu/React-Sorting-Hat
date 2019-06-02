import React, { useState } from 'react';
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

const App = () => {
  const initialState = {
    started: false,
    finished: false,
    currentQuestion: null,
    questions: questions,
    houses: houses,
    answer: '',
    assignedHouse: null
  }
  const [state, setState] = useState(initialState)

  const startHandler = () => {
    const unAnsweredQuestions = unansweredQuestions();
    const current = randomizeQuestion(unAnsweredQuestions)
    setState(prevState => ({
      ...prevState,
      started: true, currentQuestion: current
    }));

  }
  const unansweredQuestions = () => {
    return state.questions.filter(q => {
      return !q.answered
    })
  }
  const randomizeQuestion = (data) => {
    const index = Math.floor(Math.random() * Math.floor(data.length));
    return data[index];
  }
  const setNextQuestion = () => {
    const unAnsweredQuestions = unansweredQuestions();
    if (!unAnsweredQuestions.length) {
      const assignedHouseIndex = Math.floor(Math.random() * Math.floor(4));
      const assignedHouse = state.houses[assignedHouseIndex]
      setState(prevState => ({
        ...prevState,
        started: false,
        finished: true,
        assignedHouse: assignedHouse
      }));
    } else {
      const current = randomizeQuestion(unAnsweredQuestions);
      setState(prevState => ({
          ...prevState,
          currentQuestion: current
        }
      ))
    }
  }
  const answerChangerHandler = ({ target }) => {
    const value = target.value;
    setState(prevState =>({
      ...prevState,
      answer: value
    }))
  }
  const submitAnswerHandler = (event, id) => {
    event.preventDefault();
    if (state.answer) {
      const updatedQuestions = state.questions.map(question => {
        if (question.id === id) {
          question.answered = true;
          return question;
        }
        return question;
      });
      setState(prevState => ({ ...prevState, questions: updatedQuestions, answer: '' }))
      setNextQuestion()
    }
  }


  return (
    <div className="App">
      <Header />
      <WelcomeMessage startHandler={startHandler} showBtn={state.finished || state.started} />
      {state.finished && <House house={state.assignedHouse} />}
      {state.started && <Question
        question={state.currentQuestion}
        submitAnswer={submitAnswerHandler}
        answerChanged={answerChangerHandler}
        answer={state.answer}
      />
      }
    </div>
  )
}

export default App;
