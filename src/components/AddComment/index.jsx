import React from "react";

import styles from "./AddComment.module.scss";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../axios";

import { fetchComments } from "../../redux/slices/posts";

export const Index = () => {

  const { userData } = useSelector((state) => state.auth.data);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (value) => {
    if (value) {
       axios.post(`/posts/${id}`, value)
      
    };
    dispatch(fetchComments(id))
    };
 

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${userData?.avatarUrl}`}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <TextField
              error={Boolean(errors.email?.message)}
              helperText={errors.name?.message}
              type="text"
              label="Написати коментар"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              {...register("comment", { required: "Вкажіть коментар" })}
            />
            <Button disabled={!isValid} type="submit" variant="contained">
              Відправити
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
