import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../../../../features/auth/authSlice";
import FormData from "./FormData/FormData";
import FormPassword from "./FormPassword/FormPassword";

export default function UpdateInformation() {
  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: "colored" });
    }

    if (isSuccess) {
      toast.success("Datos modificados correctamente", { theme: "colored" });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="update-information">
      <FormData />
      <hr />
      <FormPassword />
    </div>
  );
}
