import { Button, ListItem, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import strings from '../localization/strings';

function EditQuestion(props) {
    return (
    <ListItem key={props.value.id} role={undefined} dense >
        <TextField fullWidth onChange={(event) => props.updateQuestion(event, props.quiz, props.parentIndex)} size="small" label={(strings.question) + " " + (props.parentIndex + 1)} variant="outlined" value={props.value.question} />
        <Button className="deleteButton" onClick={(event) => props.deleteQuestion(event ,props.quiz, props.parentIndex)}><DeleteIcon /></Button>
    </ListItem>
    )
}
export default EditQuestion;