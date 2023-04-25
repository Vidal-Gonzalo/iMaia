import React from "react";
import { TextField } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { motion, AnimatePresence } from "framer-motion";

export default function TextInput({
  item,
  handleChange,
  handleBlur,
  formik,
  value,
}) {
  const { type, label, name, required } = item;
  const { touched, errors } = formik;

  return (
    <div className="input">
      <div className="label">
        <p>{label}</p>
        {required && <span>*</span>}
      </div>

      <TextField
        id="outlined-basic"
        variant="standard"
        onBlur={handleBlur}
        theme="secondary"
        values={value}
        defaultValue={value}
        helperText={
          errors && touched ? (
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
          )
        }
        type={type}
        name={name}
        sx={{
          width: "90%",
          input: { fontFamily: "var(--global-primary-font)" },
        }}
        onChange={handleChange}
        color="secondary"
        placeholder="Tu respuesta..."
      />
    </div>
  );
}
