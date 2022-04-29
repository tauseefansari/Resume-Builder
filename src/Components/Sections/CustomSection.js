import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../constants";
import { camelCase, getConstantActionName } from "../../Helper";
import DynamicForm from "../Form/DynamicForm";

const CustomSection = ({ modalContent, onClose }) => {
    const configurationData = useSelector(state => state.configurationData); // Get Configuration Data
    const sectionData = configurationData.buildResume[modalContent.sectionName];
    const customSection = useSelector(state => state[camelCase(modalContent.custom)]);
    const sectionName = customSection ? customSection : sectionData;
    const userInfoSections = useSelector(state => state.userInfoSections); // Total User Info Sections 
    const sectionValues = useSelector(state => state[modalContent.sectionName]); // Default values of form in Redux

    const dispatch = useDispatch(); // To dispatch an action
    const sectionIndex = userInfoSections.findIndex(section => section.value === modalContent.title); // Select current section Index

    const defaultState = sectionValues ? sectionValues : new Array(sectionName.length); // If default values then use this otherwise create an array of all avalaible fields
    const [formData, setFormData] = useState(defaultState); // Current form data

    const dynamicSectionSubmitHandler = (event) => { // Form Submit Handler of current active section
        const actionName = getConstantActionName(modalContent.title); // Get Action name as a CONSTANT because in Redux action Name is same as title
        dispatch({ type: ACTIONS[actionName], payload: formData }); // Dispatching of submit data to redux of particular section
        userInfoSections[sectionIndex].endIcon = 'Done'; // Change current section end Icon as Done and Make sure Delete button Enabled
        dispatch({ type: ACTIONS.USER_INFO_SECTIONS, payload: userInfoSections }); // Dispatching of userInfo section updated
        onClose(); // Close Modal
    }

    return <DynamicForm onSubmit={dynamicSectionSubmitHandler} title={modalContent.title} defaultValues={sectionValues ? sectionValues : null} fieldsArray={sectionName} setFormData={setFormData} formData={formData} />
}

export default CustomSection;