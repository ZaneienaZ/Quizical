import React from "react"

export default function Answer(props) {
        
        
        let display   
    function displayFunc(){

    if (props.displayResults){
            if (props.correct){
                return  display ='correctAnswer'}
            else if(!props.correct && props.selected){
                return  display ='incorrectAnswer'}
            else{return display='notDisplayed'}
                return display
    } else if(!props.displayResults&& props.selected){
                return display='selected'}
    else {
                return display='notDisplayed'}
    
     if(!props.displayResults) {
        if (props.selected) {
            return  display ='notDisplayed'}
            return display
    } else {
        return  display ='notDisplayed'}
               return display         
    }
    
    displayFunc()
    return(
        <button type="radio" 
                className= {
                    display
                    }
                onClick={props.handleClick}><h3 dangerouslySetInnerHTML={{ __html:  props.answer}}/></button>
    )
}