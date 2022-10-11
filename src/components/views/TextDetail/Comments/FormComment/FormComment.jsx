import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import userImage1 from "../../../../../assets/images/avatar.jpg";
import { iMaiaApi } from "../../../../../api/iMaiaApi";
import "./FormComment.css";

export default function FormComment({ textId, userId, isCommentSent }) {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    iMaiaApi
      .commentAPost(textId, userId, comment) //Usuario logueado
      .then(() => {
        console.log("Comentario creado!");
        isCommentSent();
        setComment("");
        e.target[0].value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-comment">
      <Box
        className="form-box"
        sx={{ display: "flex", alignItems: "flex-end" }}
      >
        <div className="user-icon">
          <img src={userImage1} width={30} alt="" />
        </div>
        <TextField
          className="comment-body"
          variant="standard"
          label="Agrega un comentario"
          value={comment}
          onChange={handleChange}
          sx={{
            "& label.Mui-focused": {
              color: "var(--global-primary-color)",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "var(--global-primary-color)",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--global-primary-color)",
              },
              "&:hover fieldset": {
                borderColor: "var(--global-primary-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--global-primary-color)",
              },
            },
          }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        endIcon={
          <SendIcon fontSize={"small"} className="comment-submit-icon" />
        }
        className="comment-submit"
        disabled={comment === "" ? true : false}
      >
        Enviar
      </Button>
    </form>
  );
}
