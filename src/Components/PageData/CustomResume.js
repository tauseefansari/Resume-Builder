import { Grid, Paper, Typography, Button, Box, Avatar, Link, Card, CardContent, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { arrayToObjectConvert, formatDate, formatLink } from '../../Helper';
import DynamicIcon from "../DynamicIcon";

const CustomResume = () => {
    const configurationData = useSelector(state => state.configurationData);
    const personalDetails = useSelector(state => state.personalDetails);
    const socialLinks = useSelector(state => state.socialLinks);
    const educationalDetails = useSelector(state => state.educationalDetails);
    const projectDetails = useSelector(state => state.projectDetails);
    const educationBasicData = configurationData.buildResume['educationalDetails'];
    const projectBasicData = configurationData.buildResume['projectDetails'];
    let educationsList = [], projectList = [];


    // Objects for easy access
    const personalDetailsObj = arrayToObjectConvert(personalDetails);
    let start = 0, maxEducations = Math.floor(educationalDetails.length / educationBasicData.length);
    for (let index = 0; index < maxEducations; index++) {
        let end = start + educationBasicData.length;
        educationsList.push(arrayToObjectConvert(educationalDetails.slice(start, end)));
        start += educationBasicData.length;
    }

    let start2 = 0, maxProjects = Math.floor(projectDetails.length / projectBasicData.length);
    for (let index = 0; index < maxProjects; index++) {
        let end = start2 + projectBasicData.length;
        projectList.push(arrayToObjectConvert(projectDetails.slice(start2, end)));
        start2 += projectBasicData.length;
    }

    return <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
            <Paper variant="outlined" sx={{ p: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', ml: 1 }}>
                    <Typography variant="h5">{`${personalDetailsObj.firstName} ${personalDetailsObj.lastName}`}</Typography>
                    <Typography variant="subtitle1">{personalDetailsObj.address}</Typography>
                    <Link variant="subtitle1" href={`mailto:${personalDetailsObj.email}`} target="_blank" sx={{ display: "flex", justifyContent: "end", alignItems: "center", width: 'inherit' }}>
                        <Button variant="text" sx={{ textTransform: "lowercase" }} startIcon={<DynamicIcon iconName="Email" />}>
                            {personalDetailsObj.email}
                        </Button>
                    </Link>
                    <Link variant="subtitle1" href={`tel:+${personalDetailsObj.mobile}`} target="_blank" sx={{ display: "flex", justifyContent: "end", alignItems: "center", width: 'inherit' }}>
                        <Button variant="text" startIcon={<DynamicIcon iconName="Phone" />}>
                            {personalDetailsObj.mobile}
                        </Button>
                    </Link>
                </Box>
                {personalDetailsObj.profilePicture && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        alt={`${personalDetailsObj.firstName} ${personalDetailsObj.lastName}`}
                        src={personalDetailsObj.profilePicture}
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>}
            </Paper>
        </Grid>
        <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Paper variant="outlined" sx={{ p: 1, width: '100%', mb: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
                    {socialLinks.map((link, i) => link && (
                        <Link key={i} variant="subtitle1" href={Object.values(link)[0]} target="_blank" sx={{ display: "flex", justifyContent: "end", alignItems: "center", width: 'inherit' }}>
                            <Button variant="text" sx={{ textTransform: "lowercase" }} startIcon={<DynamicIcon iconName={Object.keys(link)[0]} />}>
                                {formatLink(Object.values(link)[0])}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1, width: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Objective:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>{personalDetailsObj.objective}</Typography>
                </Box>
            </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
            <Paper variant="outlined" sx={{ p: 1, width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Educational Qualifications:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "baseline", gap: 1 }}>
                    {educationsList.map((education, i) => (
                        <Card sx={{ width: 372 }} key={i} className="cards" color="inherit">
                            <CardContent>
                                <Typography gutterBottom variant="h5" sx={{ mb: 0 }}>
                                    <strong>{education.educationName}</strong>
                                </Typography>
                                <Typography variant="h6">
                                    {education.schoolCollegeName}  <strong>{education.percentage && `(${education.percentage}%)`}</strong>
                                </Typography>
                                <Typography variant="subtitle1">
                                    {formatDate(education.from)} - {formatDate(education.to)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Paper>
        </Grid>
        <Grid item md={12} xs={12}>
            <Paper variant="outlined" sx={{ p: 1, width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Projects:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "baseline", gap: 1 }}>
                    {projectList.map((project, i) => (
                        <Card sx={{ width: 372 }} key={i} className="cards" color="inherit">
                            <CardContent>
                                <Typography gutterBottom variant="h5" sx={{ mb: 0 }}>
                                    <strong>{project.projectName}</strong>
                                </Typography>
                                <Typography variant="subtitle1">
                                    {project.description}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {formatDate(project.from)} - {formatDate(project.to)}
                                </Typography>
                            </CardContent>
                            {project.GitHub && <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link target="_blank" href={project.GitHub}>
                                    <Button size="small" startIcon={<DynamicIcon iconName="GitHub" />}>
                                        View Project
                                    </Button>
                                </Link>
                            </CardActions>}
                        </Card>
                    ))}
                </Box>
            </Paper>
        </Grid>
    </Grid >
}

export default CustomResume;