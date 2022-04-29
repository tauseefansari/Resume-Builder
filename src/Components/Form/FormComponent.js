import ImageUpload from "./ImageUpload";
import MonthYearPicker from "./MonthYearPicker";
import TextComponent from "./TextComponent";

const FormComponent = (props) => {
    switch (props.field.component) {
        case 'ImageUpload':
            return <ImageUpload {...props} />
        case 'MonthYear':
            return <MonthYearPicker {...props} />
        default:
            return <TextComponent {...props} />
    }
}

export default FormComponent;