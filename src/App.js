import React from "react";
import QuestionBadge from "./components/question_badge";
import StartFrame from "./components/startFrame";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  
  // State that will hold all Question
  const [QuestionBank,setQuestionBank] = React.useState([])
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => setQuestionBank(getQuestion(data.results)) )
  },[])
  
  const [startQuiz,setStartQuiz]  =React.useState(false)
  // state to store Score
  const [score,setscore] = React.useState(0)

  function generateQuestion(index,question)
  {
    return{
      id:nanoid(),
      question_no: index + 1,
      body:question.question,
      user_choice:'',
      isAnswered:false,
      options:shuffle([question.correct_answer,question.incorrect_answers[0],question.incorrect_answers[1],question.incorrect_answers[2]]),
      iscorrect:null,
      showAnswer:false,
      correct_answer:question.correct_answer,
      category:question.category
    }
  } 

  function getQuestion(QuestionData){
    let array = []
    console.log(QuestionData)
    for(let i=0;i<QuestionData.length;i++)
    {
      array.push(generateQuestion(i,QuestionData[i]))
    }
    return array
  }
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  function SaveAnswer(id,answer)
  {
    setQuestionBank(prev=>prev.map(data =>{
      return(
        data.id === id ? 
        {
          ...data,isAnswered: true,
          user_choice:answer
        } 
        :
        data
      )
    }))
  }

  function getScore(){  
      const result = QuestionBank.every(data => data.isAnswered)
      // console.log("Question BANK BEFORE",QuestionBank)
      
      if(result === false){
        alert("Please , Answer Every Question")
        return
      }
      setQuestionBank(prev=>prev.map((data)=>{
        
        if(data.user_choice === data.correct_answer)
        {
          setscore(score => score +1 )
          
          return({
            ...data,iscorrect:true,showAnswer:true
          })    
        }
        else{
          return({...data,iscorrect:false,showAnswer:true})
        }
          
      })
      )
  }
  
  const Questions = QuestionBank.map((data)=>{
 
      return(
        <QuestionBadge
          key={data.id}
          id={data.id}
          question_no= {data.question_no}
          body={data.body}
          user_choice={data.user_choice}
          correct_answer={data.correct_answer}
          iscorrect = {data.iscorrect}
          showAnswer={data.showAnswer}
          isAnswered={data.isAnswered}
          options={data.options}
          category={data.category}
          SaveAnswer={(a,b)=>SaveAnswer(a,b)}
        />
      )
  })

  function start(){
    setStartQuiz(!startQuiz)
  }

  return (

    startQuiz === false ? 
    <StartFrame
        start={()=>{start()}}
    />
    :
    <div id="container">
        <h1 id="heading">Quiz App </h1>
        <h3 id="score">Score: {score} {score === 10 ? <Confetti /> : "" }</h3>
        <button onClick={getScore} id="submit-btn">Submit Quiz</button>
        <div id="ques_cont">
          {Questions}  
        </div>
    </div>
  )
}

export default App;
