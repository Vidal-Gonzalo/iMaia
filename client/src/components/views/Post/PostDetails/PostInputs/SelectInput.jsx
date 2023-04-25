import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CancelIcon from "@mui/icons-material/Cancel";

export default function SelectInputs({
  item,
  handleChange,
  handleBlur,
  formik,
  value,
  addItem,
  deleteItem,
  deleteAllItems,
  newTags,
}) {
  const { label, name, options, required } = item;
  const { touched, errors } = formik;

  return (
    <div className="input">
      <div className="label">
        <p>{label}</p>
        {required && <span>*</span>}
      </div>
      <FormControl variant="standard" sx={{ m: "0.2rem", minWidth: "90%" }}>
        <Select
          onBlur={handleBlur}
          defaultValue=""
          value={value}
          error={errors && touched ? true : false}
          name={name}
          label={label}
          onChange={(e) => {
            (name === "writing_tags" || name === "poem_tags") &&
              addItem(e.target.value);
            name === "genre" && deleteAllItems();
            handleChange(e);
            e.target.value = "";
          }}
          color="secondary"
          sx={{
            fontFamily: "var(--global-primary-font)",
            textTransform: "capitalize",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              sx={{
                width: "100%",
                textTransform: "capitalize",
                fontFamily: "var(--global-primary-font)",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors && touched ? (
          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              className="error-message-container"
            >
              <span className="error-message">
                <PriorityHighIcon
                  fontSize={"small"}
                  sx={{ marginRight: "0.3rem" }}
                />
                {errors}
              </span>
            </motion.span>
          </AnimatePresence>
        ) : (
          <span style={{ display: "block", height: "2.5rem" }}></span>
        )}
      </FormControl>
      {(name === "writing_tags" ||
        (name === "poem_tags" && newTags.length > 0)) && (
        <div className="new-tags-container">
          {newTags.map((option, index) => (
            <button
              className="new-tag"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                deleteItem(option);
              }}
            >
              <span className="button-text">
                {option}
                <CancelIcon style={{ marginLeft: "0.3em", fontSize: "20px" }} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
