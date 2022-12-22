import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./FormPassword.css";
import { updatePassword } from "../../../../../features/auth/authSlice";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";

export default function FormPassword() {
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    newPassword: "",
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(required),
    newPassword: Yup.string().required(required),
  });

  const onSubmit = (e) => {
    const userData = {
      password: values.password,
      newPassword: values.newPassword,
    };

    dispatch(updatePassword(userData));
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleBlur, handleChange, touched, values, errors } =
    formik;

  return (
    <div className="form-password-container">
      <h5>Cambiar contraseña</h5>
      <form className="form-password" onSubmit={handleSubmit}>
        <div className="form-password-inputs">
          <div className="form-password-input">
            <TextField
              name="password"
              type="password"
              label="Contraseña actual"
              values={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="input"
              placeholder="Contraseña actual..."
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password && errors.password
              }
              InputProps={{
                style: { fontFamily: "var(--global-primary-font)" },
              }}
              InputLabelProps={{
                style: { fontFamily: "var(--global-primary-font)" },
              }}
              variant="standard"
            />
          </div>
          <div className="form-password-input">
            <TextField
              name="newPassword"
              label="Nueva contraseña"
              type="password"
              values={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="input"
              placeholder="Nueva contraseña..."
              error={errors.newPassword && touched.newPassword ? true : false}
              helperText={
                errors.newPassword && touched.newPassword && errors.newPassword
              }
              InputProps={{
                style: { fontFamily: "var(--global-primary-font)" },
              }}
              InputLabelProps={{
                style: { fontFamily: "var(--global-primary-font)" },
              }}
              variant="standard"
            />
          </div>
        </div>

        <div className="form-action">
          <Button
            variant="contained"
            className="form-update-password"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
