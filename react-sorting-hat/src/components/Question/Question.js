import React from 'react'
import './Question.css'
import Answer from './Answer'

export default function question({ question, submitAnswer, answerChanged, answer}){
  return (
   <div className="question">
     <p>{question.question}</p>
      <Answer submitAnswer={submitAnswer} answerChanged={answerChanged} questionId={question.id} answer={answer} />
   </div>
  );
}