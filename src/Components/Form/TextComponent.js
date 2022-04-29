import { TextField, InputAdornment } from '@mui/material';
import DynamicIcon from "../DynamicIcon";

const TextComponent = ({ handleFiledsData, index, field, defaultValues }) => {
    const style = {
        width: "100%",
    };

    return <TextField onChange={(e) => handleFiledsData(e, index)} name={field.name} defaultValue={defaultValues ? defaultValues[index] ? defaultValues[index][field.name] : "" : ""} variant="outlined" placeholder={field.label} InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <DynamicIcon iconName={field.icon} />
            </InputAdornment>
        ),
    }} type={field.type} multiline={field.multiline} required={field.required} label={field.label} inputProps={field.inputProps} sx={style} />
}

export default TextComponent;