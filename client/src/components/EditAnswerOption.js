import { Button, Checkbox, ListItem, ListItemIcon, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import strings from '../localization/strings';

function EditAnswerOption(props) {
    const GreenCheckbox = withStyles({
        root: {
          color: green[400],
          '&$checked': {
            color: green[600],
          },
        },
        checked: {},
      })((props) => <Checkbox color="default" {...props} />);

    return (
        <ListItem key={"editansweropt" + props.value.id} role={undefined} dense >
            <ListItemIcon>
                <GreenCheckbox
                    onChange={(event) => props.updateAnsweroption(event, props.quiz, props.parentIndex, props.index, "CHECKBOX")}
                    checked={false}
                    edge="start"
                    tabIndex={-1}
                />
            </ListItemIcon>
            <ListItemIcon>
                <Checkbox
                    // TODO:
                    // onChange={(event) => console.log(event, "click")}
                     onChange={(event) => props.dispatch({ type: "SELECT_TOGGLE", data: { newText: event.target.value, quizIndex: props.quiz, questionIndex: props.parentIndex, answerIndex: props.index } })}
                    checked={props.value.selected}
                    edge="start"
                    tabIndex={-1}
                />
            </ListItemIcon>
                <div>
                    <TextField onChange={(event) => props.updateAnsweroption(event, props.quiz, props.parentIndex, props.index, "TEXT")} size="small" label={(strings.answer) + " " + (props.index + 1)} variant="outlined" value={props.value.answer} />
                    <Button className="deleteButton" onClick={(event) => props.deleteAnsweroption(event, props.quiz, props.parentIndex, props.index)}><DeleteIcon /></Button>
                </div>
        </ListItem>
    )
}

export default EditAnswerOption;