import { Checkbox, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

function AnswerOption(props) {
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
        <ListItem key={props.value.id} role={undefined} dense >
            <ListItemIcon>
                {props.answersVisible ?
                    <GreenCheckbox
                        checked={props.value.correct}
                        edge="start"
                        tabIndex={-1}
                        disabled={true}
                    /> : null}
            </ListItemIcon>
            <ListItemIcon>
                <Checkbox
                    // TODO:
                    // onChange={(event) => dispatch({ type: "SELECT_TOGGLE", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex, answerIndex: index } })}
                    checked={props.value.selected}
                    edge="start"
                    tabIndex={-1}
                />
            </ListItemIcon>
            <div><ListItemText id={props.index} primary={props.value.answer} /></div>
        </ListItem>
    )
}
export default AnswerOption;