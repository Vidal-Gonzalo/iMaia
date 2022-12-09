import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import { login, reset } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ changeForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: "colored" });
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    const userData = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(userData));
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Debe ser un e-mail válido.").required(required),
    password: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    formik;

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress sx={{ color: "var(--global-primary-color)" }} />
      </Box>
    );

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

      <div className="form-actions">
        <p onClick={changeForm}>No tengo cuenta</p>{" "}
        <Button variant="outlined" type="submit" className="submit-btn">
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
}
