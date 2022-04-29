import { useLayoutEffect, useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { ACTIONS, API } from "../constants";

const useConfiguration = () => {
    const dispatch = useDispatch();
    const [configurationLoaded, setConfigurationLoaded] = useState(true);

    useLayoutEffect(() => {
        axios.get(API.JSON_CONFIG).then(res => {
            const data = res.data;
            document.title = data.title;
            dispatch({ type: ACTIONS.CONFIG_DATA, payload: data });

            // Setting of User Sections Initially
            const userInfoSections = data.buildResume.userInfoSections;
            userInfoSections.map(section => section['endIcon'] = 'PendingActions');
            dispatch({ type: ACTIONS.USER_INFO_SECTIONS, payload: userInfoSections });
            setConfigurationLoaded(false);
        });
    }, [dispatch])
    return configurationLoaded;
}

export default useConfiguration;