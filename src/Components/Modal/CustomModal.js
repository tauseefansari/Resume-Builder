import { Backdrop, Box, Modal, Fade, Typography, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS, ANIMATION_TIMEOUT } from '../../constants';
import { camelCase, getConstantActionName } from '../../Helper';
import DynamicIcon from '../DynamicIcon';
import CustomSection from '../Sections/CustomSection';
import DynamicSection from '../Sections/DynamicSection';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomModal = ({ showModal, modalContent }) => {
    const configurationData = useSelector(state => state.configurationData); // Get Configuration Data
    const sectionData = configurationData.buildResume[modalContent.sectionName];
    let customSectionData = useSelector(state => state[camelCase(modalContent.custom)]);
    const customDataCheck = customSectionData && customSectionData.length > sectionData.length;
    const dispatch = useDispatch();

    const handleAddSection = () => {
        const actionName = getConstantActionName(modalContent.custom);
        const initialData = JSON.parse(JSON.stringify(sectionData));
        customSectionData = customSectionData ? [...customSectionData, ...initialData] : [...initialData, ...initialData];
        dispatch({ type: ACTIONS[actionName], payload: customSectionData });
    }

    const handleRemoveSection = () => {
        const actionName = getConstantActionName(modalContent.custom);
        const initialData = JSON.parse(JSON.stringify(sectionData));
        const removeItems = initialData.length;
        if (customSectionData.length > removeItems) {
            customSectionData = customSectionData.slice(0, customSectionData.length - removeItems);
            dispatch({ type: ACTIONS[actionName], payload: customSectionData });
        }
    }

    const handleClose = () => {
        showModal(false);
    }

    return (
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={Boolean(modalContent)} keepMounted onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: ANIMATION_TIMEOUT }}>
            <Fade in={Boolean(modalContent)}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" sx={{ textAlign: 'center', fontWeight: 800 }} component="h2">
                        {modalContent.title}
                    </Typography>
                    <Paper sx={{ maxHeight: 480, overflowY: 'auto', backgroundImage: 'none', boxShadow: 'none', px: 4, width: '100%' }}>
                        {modalContent.custom ?
                            <>
                                <Box sx={{ display: 'flex', justifyContent: customDataCheck ? 'space-between' : 'flex-end', mt: 1 }}>
                                    {customDataCheck && <Button variant='outlined' color='error' startIcon={<DynamicIcon iconName="Delete" />} onClick={handleRemoveSection}>Remove Last</Button>}
                                    <Button variant='outlined' startIcon={<DynamicIcon iconName="Add" />} onClick={handleAddSection}>Add More</Button>
                                </Box>
                                <CustomSection modalContent={modalContent} onClose={handleClose} />
                            </> :
                            <DynamicSection modalContent={modalContent} onClose={handleClose} />}
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
}

export default CustomModal;
