import React, { useState } from "react";
import { Avatar, Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./FormComment.css";
import { interactionServices } from "../../../../../api/interactionsServices";

export default function FormComment({ textId, user, changeComments }) {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await interactionServices.commentAPost(textId, comment);
    if (response) {
      changeComments();
      setComment("");
      e.target[0].value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-comment">
      <Box
        className="form-box"
        sx={{ display: "flex", alignItems: "flex-end" }}
      >
        <div className="user-icon">
          <Avatar src={user.picUrl} width={30} />
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
