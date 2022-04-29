import { API } from './constants';

const getGitHubUserInformation = (username) => {
    return `${API.GITHUB_USER_INFO}/${username}`;
}

const getGitHubUserRepos = (username) => {
    return `${API.GITHUB_USER_INFO}/${username}/repos`
}

const getConstantActionName = (name) => {
    return name.toUpperCase().replace(" ", "_");
}

const arrayToObjectConvert = (array) => {
    const Obj = {};
    array.forEach(element => {
        if (element) Obj[Object.keys(element)[0]] = Object.values(element)[0]
    });
    return Obj;
}

const formatDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateMonth = new Date(date);
    return `${months[dateMonth.getMonth()]} ${dateMonth.getFullYear()}`; //February 2013
}

const formatLink = (url) => {
    return url.replace(/^https?:\/\//, '');
}

const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}


export { getGitHubUserInformation, getGitHubUserRepos, getConstantActionName, arrayToObjectConvert, formatDate, formatLink, camelCase }