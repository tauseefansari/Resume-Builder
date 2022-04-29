import { Grid, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { FORM_SUBMIT_TIMEOUT, NOTIFICATION_AUTOHIDE_DURATION, NOTIFICATION_TOP_CENTER } from "../../constants";
import DynamicIcon from "../DynamicIcon";
import FormComponent from "./FormComponent";

const DynamicForm = ({ fieldsArray, onSubmit, defaultValues, setFormData, formData, title }) => {
  const [formSubmit, setFormSubmit] = useState(false);

  const style = {
    width: "100%",
  };

  const handleFiledsData = (event, i) => {
    formData = [...formData];
    if (event.type === "change") {
      formData[i] = { [event.currentTarget.name]: event.currentTarget.value };
    } else {
      formData[i] = { [event.title]: event.value };
    }
    setFormData(formData);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    setFormSubmit(true);
    setTimeout(() => onSubmit(event), FORM_SUBMIT_TIMEOUT); // To display Alert
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Grid container spacing={2.3} sx={{ mt: 1 }}>
          {fieldsArray.map((field, i) => (
            <Grid item md={field.md} xs={field.xs} key={i} sx={style}>
              <FormComponent index={i} field={field} handleFiledsData={handleFiledsData} defaultValues={defaultValues} />
            </Grid>
          ))}
          <Grid item md={12} xs={12} sx={{ ...style, display: "flex", justifyContent: "flex-end" }}>
            <Button startIcon={<DynamicIcon iconName={defaultValues ? "Update" : "Done"} />} type="submit">
              {defaultValues ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar anchorOrigin={NOTIFICATION_TOP_CENTER} sx={{ width: "100%" }} open={formSubmit} autoHideDuration={NOTIFICATION_AUTOHIDE_DURATION} onClose={() => setFormSubmit(false)}>
        <Alert onClose={() => setFormSubmit(false)} variant="filled" severity="success" sx={{ width: "100%" }}>
          <strong>{title}</strong> Data has been Submitted!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DynamicForm;
