import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from "react-hook-form"
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {fetchAuthMe, fetchRegister, isAuthSelector} from '../../redux/slices/auth'


export const Registration = () => {
   const dispatch = useDispatch();
const isAuth = useSelector(isAuthSelector)
  const {register, handleSubmit,  formState:{errors, isValid} } = useForm({
    defaultValues: {
      name:"",
      email: '',
      password:''
    },
    mode: 'onChange'
    
  })
   const onSubmit = async (v) => {
    const data = await dispatch(fetchRegister(v))
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

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створити обліковий запис
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
         <TextField error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
        
          {...register('name', { required: "Вкажіть ім'я" })}  className={styles.field} label="Повне ім'я" fullWidth />
      <TextField error={Boolean(errors.email?.message)}
          helperText={errors.name?.message}
        type="email"
          {...register('email', { required: "Вкажіть пошту" })} className={styles.field} label="E-Mail" fullWidth />
      <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
       
          {...register('password', { required: "Вкажіть пароль" })} className={styles.field} label="Пароль" fullWidth />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зареєструватися
      </Button>
     </form>
    </Paper>
  );
};
