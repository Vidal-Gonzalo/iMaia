import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../../../features/auth/authSlice";
import "./FormData.css";

export default function FormData() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    email: user.email,
    username: user.username,
    biography: user.biography,
    phrase: user.phrase,
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Debe ser un e-mail válido.").required(required),
    username: Yup.string().required(required),
    biography: Yup.string(),
    phrase: Yup.string(),
  });

  const onSubmit = (e) => {
    const userData = {
      email: values.email,
      username: values.username,
      biography: values.biography,
      phrase: values.phrase,
    };
    dispatch(updateData(userData));
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, touched, values, errors } = formik;

  return (
    <div className="form-data-container">
      <form className="form-data" onSubmit={handleSubmit}>
        <div className="form-title">
          <h5>Modificar datos de usuario</h5>
        </div>
        <Grid container>
          <Grid
            xs={3}
            item={true}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="form-data-input">
              <TextField
                name="email"
                label="Correo electrónico"
                values={values.email}
                onChange={handleChange}
                className="input"
                defaultValue={user.email}
                placeholder="Correo electrónico"
                error={errors.email && touched.email ? true : false}
                helperText={errors.email && touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                variant="standard"
              />
            </div>
            <div className="form-data-input">
              <TextField
                name="biography"
                label="Biografía"
                multiline
                values={values.biography}
                onChange={handleChange}
                rows={4}
                defaultValue={user.biography}
                InputProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
              />
            </div>
          </Grid>
          <Grid
            xs={6}
            item={true}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="form-data-input">
              <TextField
                name="username"
                label="Nombre de usuario"
                type="text"
                values={values.username}
                onChange={handleChange}
                defaultValue={user.username}
                placeholder="Nombre de usuario..."
                className="input"
                error={errors.username && touched.username ? true : false}
                helperText={errors.username && touched.username && required}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                variant="standard"
              />
            </div>
            <div className="form-data-input">
              <TextField
                name="phrase"
                label="Frase preferida"
                className="input text-area"
                multiline
                values={values.phrase}
                onChange={handleChange}
                rows={4}
                defaultValue={user.phrase}
                InputProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "var(--global-primary-font)" },
                }}
              />
            </div>
          </Grid>
        </Grid>
        <div className="form-action">
          <Button
            variant="contained"
            className="form-update-data"
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
