import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { useState } from 'react';

const MonthYearPicker = ({ handleFiledsData, index, field, defaultValues }) => {
    const [date, setDate] = useState(defaultValues ? defaultValues[index] ? defaultValues[index][field.name] : null : null);

    const handleDate = (dateValue) => {
        setDate(dateValue);
        const title = field.name;
        handleFiledsData({ title, value: dateValue }, index);
    }


    return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            views={field.views}
            label={field.label}
            minDate={new Date(field.minDate)}
            maxDate={new Date()}
            value={date}
            onChange={handleDate}
            name={field.name}
            renderInput={(params) => <TextField onKeyPress={(e) => e.preventDefault()} {...params} required={field.required} helperText={null} sx={{ width: '100%' }} />}
        />
    </LocalizationProvider>
}

export default MonthYearPicker;