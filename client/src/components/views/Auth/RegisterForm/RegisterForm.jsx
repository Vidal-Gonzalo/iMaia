import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../../../features/auth/authSlice";
import Spinner from "../../../Spinner/Spinner";

export default function RegisterForm({ changeForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      username: values.username,
      email: values.email,
      password: values.password,
    };

    dispatch(register(userData));
  };

  const required = "Campo obligatorio";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(required),
    email: Yup.string().email("Debe ser un e-mail válido.").required(required),
    password: Yup.string().required(required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    formik;

  if (isLoading) return <Spinner />;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <h3>¡Regístrate en iMaia!</h3>
        <p>Donde los amantes de la literatura se encuentran</p>
      </div>
      <div className="form-input">
        <TextField
          name="username"
          label="Nombre de usuario"
          onBlur={handleBlur}
          values={values.username}
          onChange={handleChange}
          className="input"
          placeholder="Nombre de usuario"
          error={errors.username && touched.username ? true : false}
          helperText={errors.username && touched.username && errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>

      <div className="form-input">
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
      <div className="form-input">
        <TextField
          name="password"
          type="password"
          label="Contraseña"
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
      <div className="form-input">
        <TextField
          name="confirmPassword"
          type="password"
          label="Confirmar contraseña"
          onBlur={handleBlur}
          values={values.confirmPassword}
          onChange={handleChange}
          className="input"
          placeholder="Confirmar contraseña..."
          error={
            errors.confirmPassword && touched.confirmPassword ? true : false
          }
          helperText={
            errors.confirmPassword &&
            touched.confirmPassword &&
            errors.confirmPassword
          }
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
        <p onClick={changeForm}>Ya tengo cuenta</p>{" "}
        <Button variant="outlined" type="submit" className="submit-btn">
          Regístrate
        </Button>
      </div>
    </form>
  );
}
