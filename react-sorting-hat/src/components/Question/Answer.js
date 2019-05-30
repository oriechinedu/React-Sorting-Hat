import React from 'react'
import './Question.css'


export default function answer({answerChanged, submitAnswer, questionId}){
  return (
    <form>
       <input placeholder="type answer..."  onChange={answerChanged} autoFocus={true}/>
        <button onClick={(e) => submitAnswer(e, questionId)}>Next >></button>
    </form>
  );
}