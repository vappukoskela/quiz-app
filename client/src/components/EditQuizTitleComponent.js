import { Button, ListItem, ListItemIcon, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import strings from '../localization/strings';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditQuizTitleComponent(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        handleClose();
        props.deleteQuiz(event, props.quizindex);
    }

    return (
        <ListItem key={"editquiztitlecomp" + props.quizid} role={undefined} dense >
            <div>
                <TextField onChange={(event) => props.updateQuiz(event, props.quizindex)} label={strings.quizname} size="small" variant="outlined" value={props.quizname} />
                <Button className="deleteButton" onClick={handleClickOpen}><DeleteIcon /></Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{strings.deleting} {props.quizname}</DialogTitle>
                    <DialogContent>
                        <p>
                            {strings.areyousuredelete}
                        </p>
                        <p>
                            <u>{strings.actioncannotbeundone}</u>
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            {strings.cancel}
                        </Button>
                        <Button onClick={handleSubmit} color="secondary">
                            {strings.delete}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ListItem>
    )
}

export default EditQuizTitleComponent;