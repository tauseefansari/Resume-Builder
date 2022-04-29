import { Container, Button, Avatar } from "@mui/material";
import DynamicIcon from "../DynamicIcon";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ImageUpload = ({ handleFiledsData, index, field, defaultValues }) => {
  const Input = styled("input")({
    display: "none",
  });

  const [image, setImage] = useState(
    defaultValues
      ? defaultValues[index]
        ? defaultValues[index][field.name]
        : null
      : null
  );

  const handleImageUpload = (e) => {
    const title = e.currentTarget.name;
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
      handleFiledsData({ title, value: reader.result }, index);
    };
    reader.readAsDataURL(file);
  };

  const handleKeyboradUpload = (e) => {
    if (e.which === 32 || e.which === 13) {
      e.preventDefault();
      document.getElementById("file-upload").click();
    }
  };

  const removeImageHandler = (e) => {
    const title = field.name;
    setImage(null);
    handleFiledsData({ title, value: null }, index);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mb: 1,
      }}
    >
      <Avatar
        alt={field.label}
        src={image}
        sx={{ width: 60, height: 60, mb: 2 }}
      />
      {!image && (
        <label htmlFor="file-upload">
          <Input
            name={field.name}
            onChange={handleImageUpload}
            tabIndex="-1"
            accept={field.accept}
            id="file-upload"
            multiple
            type={field.type}
            required={field.required}
          />
          <Button
            variant="outlined"
            onKeyUp={handleKeyboradUpload}
            startIcon={<DynamicIcon iconName={field.icon} />}
            component="span"
          >
            {field.label}
          </Button>
        </label>
      )}
      {image && (
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            color="error"
            onClick={removeImageHandler}
            startIcon={<DynamicIcon iconName={field.deleteIcon} />}
            component="span"
          >
            {field.deleteLabel}
          </Button>
        </label>
      )}
    </Container>
  );
};

export default ImageUpload;
