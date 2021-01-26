import {ListItem} from "@material-ui/core";

function QuizTitleComponent(props) {
    return (
        <ListItem key="editquiztitlecomp" >
            <div >
               <h2>{props.quizname}</h2>
            </div>
        </ListItem>
    )
}

export default QuizTitleComponent;