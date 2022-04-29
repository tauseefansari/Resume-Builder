import * as Icons from "@mui/icons-material";
import React from "react";

const DynamicIcon = ({ iconName }) => {
    return React.createElement(Icons[iconName])
}

export default DynamicIcon;
