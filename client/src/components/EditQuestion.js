import { Button, ListItem, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import { useState } from "react";
import strings from '../localization/strings';
import QuestionDropZone from "./QuestionDropZone";

function EditQuestion(props) {
    const [showDropZone, setShowDropZone] = useState(false)
    const openDropZone = () => {
        setShowDropZone(!showDropZone)
    }
    const [questionText, setQuestionText] = useState(props.value.question)


    return (<div>
        <ListItem key={props.value.id} role={undefined} dense >
            <TextField fullWidth onChange={(event) => setQuestionText(event.target.value)} onBlur={(event) => props.updateQuestion(event, props.quiz, props.parentIndex)} size="small" label={(strings.question) + " " + (props.parentIndex + 1)} variant="outlined" value={questionText} />
            <Button className="deleteButton" onClick={(event) => props.deleteQuestion(event, props.quiz, props.parentIndex)}><DeleteIcon /></Button>
            <Button className="deleteButton" onClick={(event) => openDropZone()}><ImageIcon /></Button>
        </ListItem>
        <ListItem>
            {showDropZone ?
                <QuestionDropZone />
                : ""
            }

        </ListItem></div>
    )
}
export default EditQuestion;