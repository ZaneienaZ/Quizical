import React from "react"
import Question from "/Question"
import { nanoid } from "nanoid"

export default function App(){
    
    const [firstLayer, setFirstLayer] = React.useState(true);
    const [testNumber, setTestNumber] = React.useState(0)
    const [quizData, setQuizData] = React.useState({})
    const [answerResponse, setAnswerResponse] = React.useState(Array(5).fill(false))
    const [displayResults, setDisplayResults] = React.useState(false)
    const question = []
    //const count = 0
    
    function startQuiz(){
        setFirstLayer(prev => !prev)
    }
 
     React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setQuizData(getNewQuestions(data.results)))
    }
    
    , [testNumber])
    

    


   function getNewQuestions(questionList) {

       const newQuizQuestions = questionList.map(question => {
           return ({
               id: nanoid(),
               question: question.question,
               correctAnswer: question.correct_answer,
               incorrectAnswers: question.incorrect_answers
           })
       })
       
       return newQuizQuestions
   }

   function quizHelper(index){
    try {
        if(quizData.length>0) {
        return quizData[index].question
        }
    }
    catch(e) {  
    }
   }
   
   function handleClick(index, rightChoice){
           let response = [...answerResponse]
           response[index]= rightChoice
       setAnswerResponse(prev => [...prev].map((element, elementNumber) => {return elementNumber===index?  rightChoice : element}) )
        
       
       //rightChoice ? count++:count--
   }
   
   function handleDisplayResults(){
       setDisplayResults(prev=>!prev)
   }
   
   function handleNewQuestions() {
       setTestNumber(prev=>prev+1)
       setDisplayResults(false)
       setAnswerResponse(Array(5).fill(false))
   }
      

    return (
        <main>
            <div id="blob1"></div>
            
            
            {firstLayer && <div className="welcome-page">
                <h2>Quizical</h2>
                <h3>The game of life</h3>
                <button className="start-quiz" onClick={startQuiz}>Start Quiz</button>
            </div>}
            
            
        <div className="questions-container">
        
            {quizData.length>0 &&
            quizData.map( (element, index) =>
            {return (
                <Question 
             key={quizData[index].id} 
             quizData={quizData} 
             qNumber = {index} 
             handleClick={(bool)=>handleClick(index, bool)}
             displayResults={displayResults}
 />)}
 
            )
            
            }    
        <div className ="results">
        {!displayResults && <button className="start-quiz" onClick={()=>handleDisplayResults(prev=>!prev)}>See Results</button>}
        {displayResults && answerResponse.map(element => element).filter(Boolean).length+' out of 5 questions correct'}
         {displayResults && <button className="start-quiz" onClick={()=>handleNewQuestions()}>New Questions</button> }
       </div>
        
        </div>
        <div>{answerResponse}</div>
            
            
            <div id="blob2"></div>
            
        </main>
    )
}