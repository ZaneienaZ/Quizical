import React from "react"
import Answer from "/Answer"


export default function Question(props){
    
    const [selected, setSelected] = React.useState([false,false,false,false])
    //const [randomOrder] = React.useState(()=>array=>shuffle([0,1,2,3]))
    let questionIndex = props.qNumber
    let current = props.quizData.length > 0 ? props.quizData[questionIndex] : "loading"
    
    function incorrectAnswers(){ for (let i=0; i < props.incorrectAnswers.length; i++){
    return
   <Answer className="incorrectAnswer" key={current.correctAnswer} answer={current.correctAnswer} />
    }
    }
    
const [randomOrder, setRandomOrder] = React.useState([])

React.useEffect(() => 
  {
      const initialNumber = shuffle([0,1,2,3])
    setRandomOrder(initialNumber);
  }
, [])
    
  
  //returns sudo random answers
  const shuffle = (array) => {
      //creates copy of answers
    const throwArray = [...array]
    const randomizedAnswers = [];
    
    //adds answers to new array in random order from old array
    while (throwArray.length > 0) {
        randomizedAnswers.push(throwArray.splice(Math.floor(Math.random() * throwArray.length), 1));
    }
    
    return randomizedAnswers;    
};


  
  function handleClick(bool, index){ 
      setSelected( (prev)=>
      prev.map((element, elementNumber)=> 
      elementNumber===index? !element: false
      )
      ) 
      props.handleClick(bool)
  } 
  
let answers= []
    let className
        answers.push(
      <Answer   
              correct = {true}
              key={current.correctAnswer} 
              answer={current.correctAnswer}
              selected = {selected[3]}
              index = {3}
              handleClick={()=>handleClick(true, 3)}
              displayResults={props.displayResults}
              />
              )
    
current.incorrectAnswers.forEach(
    (element, index)=>{
    answers.push(
    <Answer 
            correct = {false}
            key={element} 
            answer={element}
            selected={selected[index]}
            index={index}
            handleClick={()=>handleClick(false, index)}
            displayResults={props.displayResults}
 />)
    })
    
// const calculation = useMemo(() => expensiveCalculation(count), [count]); 
//let randomizedAnswers = shuffle(answers)

let randomAnswers = answers.map((element, index) => answers[randomOrder[index]])
  
    return (
    <div className="question">
        <div dangerouslySetInnerHTML={{ __html:  current.question}}/>
        <div className="Answer-container">
        {randomAnswers}            
        </div>
        <hr/>
        
    </div>
    )
}