import { Grid } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Body from "./Body";
import Header from "./Header";
import Footer from "./Footer";

const MainContainer = () => {
    return <BrowserRouter>
        <Grid container spacing={1.5}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <Body />
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid >
    </BrowserRouter>

}

export default MainContainer;