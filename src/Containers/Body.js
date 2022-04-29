import { Container, Box } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import GitHubResume from "../pages/GitHubResume";
import BuildResume from "../pages/BuildResume";
import Error from "../pages/Error";
import Resume from "../pages/Resume";

const Body = () => {
    return <Container maxWidth="xl" disableGutters>
        <Box sx={{ minHeight: '100vh' }}>
            <Routes>
                <Route path="/" element={<GitHubResume />} />
                <Route path="build" element={<BuildResume />} />
                <Route path="resume" element={<Resume />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Box>
    </Container>
}

export default Body;