import React from "react"

function QuestionFrame(props){

    // state that hold active option
    const[activeindex,setactiveindex] = React.useState(0)

    const styles = {
        boxShadow: props.iscorrect === true ? "-7px -7px 8px #58fd5b" : props.iscorrect === false ? " -7px -7px 8px #eb645b" : "#f0f1f9 -7px -7px 8px"
    }
    const options = [props.options[0],props.options[1],props.options[2],props.options[3]];

    const style_option1 = {
        backgroundColor : props.showAnswer ?
         props.correct_answer === options[0] ? "#58fd5b" :  "#eb645b" 
         :
         activeindex === 1 ? "#d787bb" : "whitesmoke"
    }

    const style_option2 = {
        backgroundColor :props.showAnswer ? 
        props.correct_answer === options[1] ? 
        "#58fd5b": "#eb645b" : activeindex === 2 ? "#d787bb" : "whitesmoke"
    }

    const style_option3 ={
        backgroundColor :props.showAnswer ? props.correct_answer === options[2] ? "#58fd5b" : "#eb645b" : activeindex === 3 ? "#d787bb" : "whitesmoke"
    }
    const style_option4 ={
        backgroundColor :props.showAnswer ? props.correct_answer === options[3] ? "#58fd5b" : "#eb645b"  : activeindex === 4 ? "#d787bb" : "whitesmoke"
    }
    function handleClick(event){
        const name = event.target.name    
        if(name === 'A')
        {   
            setactiveindex(1)
        }
        else if(name === "B")
        {
            setactiveindex(2)
        }
        else if(name === "C")
        {
            setactiveindex(3)
        }
        else if(name === "D")
        {
            setactiveindex(4)
        }
    }
    return(
        <div id="question_container" style={styles}>
            <p id="q_no">Question No : {props.question_no}</p>
            <p id="q_body" > 
                {props.body}
            </p>
            <div id="options">
                {
                options[0] && 
                <button className="btn" 
                name="A"
                onClick={
                    (event)=>{
                        handleClick(event);
                        props.SaveAnswer(props.id,options[0])
                        }
                    } 
                style={style_option1}
                > 
                {options[0]}
                </button>
                }
                {
                options[1] && 
                <button className="btn" 
                name="B"
                onClick={
                    (event)=>{
                        handleClick(event);
                        props.SaveAnswer(props.id,options[1])
                        }
                    } 
                style={style_option2}
                >
                {options[1]}
                </button>
                }
                {
                options[2] && 
                <button className="btn" 
                name="C"
                onClick={
                    (event)=>{
                        handleClick(event);
                        props.SaveAnswer(props.id,options[2])
                        }
                    } 
                style={style_option3}
                >
                {options[2]}
                </button>
                }
                {
                options[3] && 
                <button className="btn" 
                name="D"
                onClick={
                    (event)=>{
                        handleClick(event);
                        props.SaveAnswer(props.id,options[3])
                        }
                    } 
                style={style_option4} 
                > 
                {options[3]}
                </button>}
            </div>
        </div>
    )
}

export default QuestionFrame