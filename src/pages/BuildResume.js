import { Container, Typography, Button, Box, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../Components/Modal/CustomModal";
import DynamicIcon from "../Components/DynamicIcon";
import DeleteDialog from "../Components/DeleteDialog";
import { ACTIONS } from "../constants";

const BuildResume = () => {
    const configurationData = useSelector(state => state.configurationData);
    const buildResumePageData = configurationData.buildResume;
    const userSections = useSelector(state => state.userInfoSections);
    const [showModal, setShowModal] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserSectionsFilled = userSections.every(section => section.endIcon === "Done");

    const handleBuildResume = () => {
        dispatch({ type: ACTIONS.GITHUB_USER_INFORMATION, payload: null });
        navigate(buildResumePageData.path);
    };

    const showModalDialog = e => {
        const custom = e.currentTarget.id ? e.currentTarget.id : '';
        setShowModal({
            title: e.currentTarget.innerText,
            sectionName: e.currentTarget.name,
            custom
        });
    };

    const showDeleteDialog = e => {
        setShowDialog({ title: e.currentTarget.name });
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, textAlign: "center" }}>
                {buildResumePageData.pageTitle}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
                {userSections.map((section, i) => (
                    <ButtonGroup variant="outlined" aria-label="outlined button group" key={i}>
                        <Button size="large" sx={{ textTransform: "none" }} onClick={showModalDialog} name={section.name} id={section.id} startIcon={<DynamicIcon iconName={section.icon} />} endIcon={<DynamicIcon iconName={section.endIcon} />}>
                            {section.value}
                        </Button>
                        {section.endIcon === "Done" && <Button onClick={showDeleteDialog} sx={{ pr: 0.5 }} name={section.value} startIcon={<DynamicIcon iconName={section.deleteIcon} />} />}
                    </ButtonGroup>
                ))}
                {showModal && <CustomModal showModal={setShowModal} modalContent={showModal} />}
                {showDialog && <DeleteDialog showDialog={setShowDialog} dialogContent={showDialog} />}
            </Box>
            {isUserSectionsFilled && (
                <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", gap: 2, mt: 4 }}>
                    <Button size="large" onClick={handleBuildResume} variant="outlined" startIcon={<DynamicIcon iconName={buildResumePageData.buildResumeButtonIcon} />}>
                        {buildResumePageData.buildResumeButton}
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default BuildResume;
