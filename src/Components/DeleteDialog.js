import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Alert, Snackbar } from '@mui/material';
import { ACTIONS, DELETE_DIALOG_SLIDE_DIRECTION, FORM_SUBMIT_TIMEOUT, NOTIFICATION_AUTOHIDE_DURATION, NOTIFICATION_BOTTOM_CENTER } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getConstantActionName } from '../Helper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={DELETE_DIALOG_SLIDE_DIRECTION} ref={ref} {...props} />;
});

const DeleteDialog = ({ showDialog, dialogContent }) => {
    const userInfoSections = useSelector(state => state.userInfoSections);
    const sectionIndex = userInfoSections.findIndex(section => section.value === dialogContent.title);
    const dispatch = useDispatch();
    const [dialogSubmit, setDialogSubmit] = useState(false);

    const handleClose = () => {
        showDialog(false);
    };

    const handleDelete = () => {
        const actionName = getConstantActionName(dialogContent.title);
        dispatch({ type: ACTIONS[actionName], payload: null });
        userInfoSections[sectionIndex].endIcon = "PendingActions";
        dispatch({ type: ACTIONS.USER_INFO_SECTIONS, payload: userInfoSections });
        setDialogSubmit(true);
        setTimeout(() => showDialog(false), FORM_SUBMIT_TIMEOUT); // To display Alert
    };


    return (
        <Dialog
            open={Boolean(dialogContent)}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Are you sure want to delete?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    All records of <strong>{dialogContent.title}</strong> will be deleted! Are you sure want to continue?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete}>Agree</Button>
            </DialogActions>
            <Snackbar anchorOrigin={NOTIFICATION_BOTTOM_CENTER} open={dialogSubmit} autoHideDuration={NOTIFICATION_AUTOHIDE_DURATION} onClose={() => setDialogSubmit(false)}>
                <Alert onClose={() => setDialogSubmit(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
                    <strong>{dialogContent.title}</strong> Records deleted Successfully!
                </Alert>
            </Snackbar>
        </Dialog>
    )
}

export default DeleteDialog;