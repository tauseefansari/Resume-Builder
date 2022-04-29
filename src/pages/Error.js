import { Container, Typography, Tooltip, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DynamicIcon from '../Components/DynamicIcon';

const Error = () => {
    return <Container maxWidth="xl">
        <Typography variant='h1' sx={{ width: '100%', mt: 2, textAlign: 'center', color: 'inherit' }}> 404 </Typography>
        <Typography variant='h6' sx={{ width: '100%', textAlign: 'center', color: 'inherit' }}> Page Not Found </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', color: 'inherit' }}>
            <Tooltip title={"Back to Home"}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button
                        color='inherit'
                        variant="outlined"
                        sx={{ my: 2, p: 1.5, color: 'inherit' }}
                        startIcon={<DynamicIcon iconName={"Home"} />}
                    >
                        Back to Home
                    </Button>
                </Link>
            </Tooltip>
        </Box>
    </Container>


}

export default Error;