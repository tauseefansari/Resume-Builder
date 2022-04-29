import { Paper, Typography, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
    const configurationData = useSelector(state => state.configurationData);
    const footer = configurationData.footer;

    return (
        <Container maxWidth="lg" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} disableGutters>
            <Paper variant='outlined' sx={{ width: '100%', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h6'>{footer.copyrightMessage}</Typography>
            </Paper>
        </Container >
    );
}

export default Footer;