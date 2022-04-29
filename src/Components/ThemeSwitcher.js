import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, IconButton } from '@mui/material';
import { ACTIONS } from '../constants';
import DynamicIcon from './DynamicIcon';

const ThemeSwitcher = () => {
    const currentTheme = useSelector(state => state.currentTheme);
    const icon = currentTheme === 'dark' ? <DynamicIcon iconName={"LightMode"} /> : <DynamicIcon iconName={"DarkMode"} />;
    const dispatch = useDispatch();

    const changeTheme = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        dispatch({ type: ACTIONS.CURRENT_THEME, payload: newTheme })
    }

    return <Tooltip title={`${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`}>
        <IconButton onClick={changeTheme} sx={{ ml: 0.5 }}>
            {icon}
        </IconButton>
    </Tooltip>
}

export default ThemeSwitcher;