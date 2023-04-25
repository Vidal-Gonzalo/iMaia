import React, { useState } from "react";
import { postInputs } from "../../../../assets/data/PostInputs";
import TextInput from "./PostInputs/TextInput";
import SelectInput from "./PostInputs/SelectInput";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { setDetails } from "../../../../features/texts/newTextSlice";
import { useNavigate } from "react-router-dom";

export default function PostDetails() {
  const [newTags, setNewTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItem = (item) => {
    if (!newTags.find((element) => element === item)) {
      setNewTags([...newTags, item]);
    }
  };

  const deleteItem = (item) => {
    setNewTags(newTags.filter((element) => element !== item));
  };

  const deleteAllItems = () => {
    setNewTags([]);
  };

  const initialValues = {
    title: "",
    overview: "",
    genre: "",
    poem_tags: "",
    writing_tags: "",
  };

  const onSubmit = () => {
    const { title, overview, genre } = formik.values;
    const details = {
      title,
      overview,
      genre,
      tags: newTags,
    };
    dispatch(setDetails(details));
    navigate("/write/text", { replace: true });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const { handleSubmit } = formik;

  const inputComponents = {
    text: TextInput,
    select: SelectInput,
  };

  const getInputProps = (item, formik) => ({
    item,
    formik: {
      touched: formik.touched[item.name],
      errors: formik.errors[item.name],
    },
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    value: formik.values[item.name],
  });

  const renderInputs = (inputs, formik) => {
    return inputs.map((item, index) => {
      const InputComponent = inputComponents[item.type] || "input";
      if (item.name === "writing_tags" || item.name === "poem_tags") {
        if (formik.values.genre === "poems" && item.name === "poem_tags") {
          return (
            <InputComponent
              key={index}
              {...getInputProps(item, formik)}
              newTags={newTags}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          );
        } else if (
          formik.values.genre === "writings" &&
          item.name === "writing_tags"
        ) {
          return (
            <InputComponent
              key={index}
              {...getInputProps(item, formik)}
              newTags={newTags}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          );
        } else {
          return null;
        }
      } else {
        return (
          <InputComponent
            key={index}
            {...getInputProps(item, formik)}
            deleteAllItems={deleteAllItems}
          />
        );
      }
    });
  };

  return (
    <div className="post-details-container">
      <div className="post-details-title">
        <span>Detalles del texto</span>
      </div>
      <form className="post-details" onSubmit={handleSubmit}>
        {renderInputs(postInputs, formik)}{" "}
        <div className="next-button-container">
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontFamily: "var(--global-primary-font)",
              background: "var(--global-primary-color)",
              ":hover": {
                background: "var(--global-primary-color)",
              },
            }}
            endIcon={<KeyboardTabIcon />}
          >
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  );
}
