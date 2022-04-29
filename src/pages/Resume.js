import { Container, Fab, Zoom } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import DynamicIcon from "../Components/DynamicIcon";
import { ComponentToPrint } from "../Components/Print/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { ANIMATION_TIMEOUT } from "../constants";

const Resume = () => {
    const personalDetails = useSelector(state => state.personalDetails);
    const gitHubUserInfo = useSelector(state => state.gitHubUserInfo);
    const componentRef = useRef();

    // Print Using Functional Component and useReactToPrint Hook
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return <Container sx={{ mt: 2 }}>
        <ComponentToPrint ref={componentRef} />
        {(gitHubUserInfo || personalDetails) && <Zoom
            in={true}
            timeout={ANIMATION_TIMEOUT}
            unmountOnExit
        >
            <Fab sx={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} onClick={handlePrint} aria-label="Print Resume" color="primary">
                <DynamicIcon iconName="Print" />
            </Fab>
        </Zoom>}
    </Container>;
};

export default Resume;
