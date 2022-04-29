import { Box, Button, TextField, Typography, Card, CardContent, CardMedia, Link, Snackbar, Alert, InputAdornment } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicIcon from "../Components/DynamicIcon";
import { ACTIONS, NOTIFICATION_AUTOHIDE_DURATION, NOTIFICATION_BOTTOM_CENTER } from "../constants";
import { getGitHubUserInformation } from "../Helper";

const GitHubResume = () => {
  const configurationData = useSelector(state => state.configurationData);
  const githubPageData = configurationData.githubResume;
  const [errorSuccess, setErrorSuccess] = useState(null);
  const [githubUserCard, setGithubUserCard] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const githubUserInputRef = useRef();

  const handleBuildResume = () => {
    dispatch({ type: ACTIONS.PERSONAL_DETAILS, payload: null });
    dispatch({ type: ACTIONS.EDUCATIONAL_DETAILS, payload: null });
    dispatch({ type: ACTIONS.SOCIAL_LINKS, payload: null });
    const userInfoSections = configurationData.buildResume.userInfoSections;
    userInfoSections.map(section => (section["endIcon"] = "PendingActions"));
    dispatch({ type: ACTIONS.USER_INFO_SECTIONS, payload: userInfoSections });
    navigate(githubPageData.path);
  };

  const githubUserDataHandler = e => {
    e.preventDefault();
    const githubUserName = githubUserInputRef.current.value;
    if (!githubUserName) githubUserInputRef.current.focus();
    else
      axios
        .get(getGitHubUserInformation(githubUserName))
        .then(res => {
          setGithubUserCard(res.data);
          setErrorSuccess({ severity: "success", message: `Welcome to ${configurationData.title} ${githubUserName}` });
          dispatch({ type: ACTIONS.GITHUB_USER_INFORMATION, payload: res.data });
          githubUserInputRef.current.value = "";
        })
        .catch(error => setErrorSuccess({ severity: "error", message: error.message }));
  };

  return (
    <>
      <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "70%" } }}>
        <Typography variant="h3" sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, textAlign: "center" }}>
          {githubPageData.pageTitle}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
          <TextField
            inputRef={githubUserInputRef}
            error={errorSuccess && errorSuccess.severity === "error"}
            helperText={errorSuccess && errorSuccess.severity === "error" ? "Invalid Username" : "Enter Username"}
            required
            id="github-username"
            label={githubPageData.inputLabel}
            placeholder={githubPageData.inputLabel}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DynamicIcon iconName={githubPageData.icon} />
                </InputAdornment>
              )
            }}
          />
          <Button onClick={githubUserDataHandler} sx={{ p: 1.8 }} variant="outlined" size="large" type="submit">
            {githubPageData.buttonText}
          </Button>
        </Box>
      </Box>
      {errorSuccess && (
        <Snackbar
          anchorOrigin={NOTIFICATION_BOTTOM_CENTER}
          open={Boolean(errorSuccess)}
          autoHideDuration={NOTIFICATION_AUTOHIDE_DURATION}
          onClose={() => {
            setErrorSuccess(null);
            errorSuccess && errorSuccess.severity === "error" && githubUserInputRef.current.focus();
          }}
        >
          <Alert onClose={() => setErrorSuccess(null)} variant="filled" severity={errorSuccess.severity} sx={{ width: "100%" }}>
            {errorSuccess.message}
          </Alert>
        </Snackbar>
      )}
      {githubUserCard && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <Card sx={{ display: "flex" }}>
            <CardMedia component="img" sx={{ width: 151 }} image={githubUserCard.avatar_url} alt={githubUserCard.name} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {githubUserCard.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {githubUserCard.bio}
                </Typography>
                <Link href={githubUserCard.html_url} target="_blank">
                  Visit Profile
                </Link>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Button onClick={handleBuildResume}>{githubPageData.cardButtonTitle}</Button>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default GitHubResume;
