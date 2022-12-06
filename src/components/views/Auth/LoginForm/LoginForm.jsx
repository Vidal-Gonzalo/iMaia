import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ changeForm }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (e) => {
    dispatch(login(e.email, e.password))
      .then(() => {
        console.log("Logueadisimo bro");
        navigate("/");
      })
      .catch(() => {
        setError("Usuario y/o contraseña incorrectos.");
      });
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Debe ser un e-mail válido.").required(required),
    password: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    formik;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <h3>¡Bienvenido a iMaia!</h3>
        <p>Donde los amantes de la literatura se encuentran</p>
      </div>
      <div className="form-login-input">
        <TextField
          name="email"
          label="Correo electrónico"
          onBlur={handleBlur}
          values={values.email}
          onChange={handleChange}
          className="input"
          placeholder="Correo electrónico"
          error={errors.email && touched.email ? true : false}
          helperText={errors.email && touched.email && errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
      <div className="form-login-input">
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          onBlur={handleBlur}
          values={values.password}
          onChange={handleChange}
          placeholder="Contraseña..."
          className="input"
          error={errors.password && touched.password ? true : false}
          helperText={errors.password && touched.password && required}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>

      <div className="form-error">
        {error ? <span className="error-message">{error}</span> : null}
      </div>
      <div className="form-actions">
        <p onClick={changeForm}>No tengo cuenta</p>{" "}
        <Button variant="outlined" type="submit" className="submit-btn">
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
}
