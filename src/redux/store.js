import { createStore } from "redux";
import { ACTIONS } from "../constants";

const inititalState = {
    currentTheme: 'dark',
    configurationData: null,
    gitHubUserInfo: null,
    userInfoSections: null,
    personalDetails: null,
    educationalDetails: null,
    projectDetails: null,
    socialLinks: null,
    customEducation: null,
    customProject: null,
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case ACTIONS.CURRENT_THEME:
            return {
                ...state,
                currentTheme: action.payload
            }
        case ACTIONS.CONFIG_DATA:
            return {
                ...state,
                configurationData: action.payload
            }
        case ACTIONS.GITHUB_USER_INFORMATION:
            return {
                ...state,
                gitHubUserInfo: action.payload
            }
        case ACTIONS.USER_INFO_SECTIONS:
            return {
                ...state,
                userInfoSections: action.payload
            }
        case ACTIONS.PERSONAL_DETAILS:
            return {
                ...state,
                personalDetails: action.payload
            }
        case ACTIONS.EDUCATIONAL_DETAILS:
            return {
                ...state,
                educationalDetails: action.payload
            }
        case ACTIONS.PROJECT_DETAILS:
            return {
                ...state,
                projectDetails: action.payload
            }
        case ACTIONS.SOCIAL_LINKS:
            return {
                ...state,
                socialLinks: action.payload
            }
        case ACTIONS.CUSTOM_EDUCATION:
            return {
                ...state,
                customEducation: action.payload
            }
        case ACTIONS.CUSTOM_PROJECT:
            return {
                ...state,
                customProject: action.payload
            }
        default:
            return state;

    }
}

const store = createStore(reducer);

export default store;