import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form"
import styles from "./Login.module.scss";
import {fetchAuthMe, fetchUserData, isAuthSelector} from '../../redux/slices/auth'
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
const isAuth = useSelector(isAuthSelector)
  const {register, handleSubmit, setError, formState:{errors, isValid} } = useForm({
    defaultValues: {
      email: '',
    password:''
    },
    mode: 'onChange'
    
})

  const onSubmit = async (v) => {
    const data = await dispatch(fetchUserData(v))
    if (!data.payload) {
      return alert('Не вдалось зареєструватися')
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
    dispatch(fetchAuthMe())
  }


  if (isAuth) {
    return <Navigate to = '/'/>
  }
  console.log(isAuth)
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вхід в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
         <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
        type="email"
          {...register('email', { required: "Вкажіть пошту" })}
        fullWidth
      />
        <TextField className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
           {...register('password', { required: "Вкажіть пароль" })}
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained"
          fullWidth>
        Увійти
      </Button>
     </form>
    </Paper>
  );
};
