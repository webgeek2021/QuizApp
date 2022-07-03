import React from "react"

function StartFrame(props){
    return(
        <div id="start_frame">
            <button onClick={props.start}>Start Quiz</button>
        </div>
    )
}
export default StartFrame