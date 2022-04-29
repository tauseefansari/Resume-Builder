import { Grid, Paper, Typography, Card, CardActions, CardMedia, CardContent, Button, Link, Box, Avatar, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DynamicIcon from "../DynamicIcon";
import { formatLink, getGitHubUserRepos } from "../../Helper";
import { NOTIFICATION_AUTOHIDE_DURATION, NOTIFICATION_BOTTOM_CENTER } from "../../constants";

const GitHubResume = () => {
    const gitHubUserInfo = useSelector(state => state.gitHubUserInfo);
    const username = gitHubUserInfo.login;
    const [userRepos, setUserRepos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(getGitHubUserRepos(username))
            .then(res => setUserRepos(res.data.reverse())) // Sort based on upload i.e. most recent first
            .catch(error => setError(error.message));
    }, [username]);

    return (
        <Grid container spacing={1}>
            <Snackbar anchorOrigin={NOTIFICATION_BOTTOM_CENTER} open={Boolean(error)} autoHideDuration={NOTIFICATION_AUTOHIDE_DURATION} onClose={() => setError(null)} message={error} />
            <Grid item md={12} xs={12}>
                <Paper variant="outlined" sx={{ p: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', ml: 1 }}>
                        <Typography variant="h5">{gitHubUserInfo.name}</Typography>
                        <Typography variant="subtitle1">{gitHubUserInfo.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt={gitHubUserInfo.name}
                            src={gitHubUserInfo.avatar_url}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={12} xs={12}>
                <Paper variant="outlined" sx={{ p: 1, width: '100%', mb: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
                        <Link variant="subtitle1" href={gitHubUserInfo.html_url} target="_blank" sx={{ display: "flex", justifyContent: "end", alignItems: "center", width: 'inherit' }}>
                            <Button variant="text" sx={{ textTransform: "lowercase" }} startIcon={<DynamicIcon iconName="GitHub" />}>
                                {formatLink(gitHubUserInfo.html_url)}
                            </Button>
                        </Link>
                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Bio:
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>{gitHubUserInfo.bio}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={12} xs={12}>
                <Paper variant="outlined" sx={{ p: 1, width: '100%' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} color="inherit">
                        Projects :
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "baseline", gap: 2, ml: 1 }}>
                        {userRepos.map(repo => {
                            return (
                                <Card sx={{ width: 363 }} key={repo.id} className="cardsGit" color="inherit">
                                    <CardMedia component="img" height="145" image={repo.owner.avatar_url} alt={repo.owner.name} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {repo.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {repo.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link target="_blank" href={repo.html_url}>
                                            <Button size="small" startIcon={<DynamicIcon iconName="GitHub" />}>
                                                Learn More
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            );
                        })}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GitHubResume;
