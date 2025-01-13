import React, { FC, useState, useEffect } from 'react';
import './logIn.scss';
import LogInUser from '../../models/LogInUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../Redux/store';
import { addUser, logIn } from '../../Redux/features/personSlice';
import { useSelector } from 'react-redux';

interface LogInProps {
  funcParentAdd: (user_type: number) => void;
  children: React.ReactNode;
}

const LogIn: FC<LogInProps> = (props: LogInProps) => {
  const [err, setErr] = useState<string>('');
  const [IsErr, setIsErr] = useState<boolean>(false);

  const myPersonSlice = useSelector((myStore: any) => myStore.personSlice);
  const dispatch = useAppDispatch();

   // useEffect to watch for changes in the Redux store's user state
   useEffect(() => {
    if (myPersonSlice.user.role!=0) { // Check if the user data exists
      console.log("hey!!!!!!!!!!!!!!!!!!!!")
      console.log(myPersonSlice.user.user.user_type)
      props.funcParentAdd(myPersonSlice.user.user.user_type); // Pass user role to parent
    }
  }, [myPersonSlice.user, props]); // Re-run this effect only when user data changes

  const myForm = useFormik({
    initialValues: new LogInUser('email@gmail.com', '1234#'),
    onSubmit: (valueForm: LogInUser) => {
      try {
        dispatch(logIn(valueForm));
        props.funcParentAdd(myPersonSlice.user.role); // Pass user role to parent
      } catch (err: any) {
        setIsErr(true);
        setErr(err.message || 'An error occurred');
      }
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required().min(8)
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    })
  });

  // // useEffect to watch for changes in the Redux store's user state
  // useEffect(() => {
  //   if (myPersonSlice.user.id) { // Check if the user data exists
      // props.funcParentAdd(myPersonSlice.user.role); // Pass user role to parent
  //   }
  // }, [myPersonSlice.user, props]); // Re-run this effect only when user data changes

  return (
    <div className="user-details">
      <form onSubmit={myForm.handleSubmit} className="col-sm-6 m-5">
        <h2 className="mt-5">{props.children}</h2>

        <div className="form-group mt-3">
          <label>אימייל</label>
          <input
            name="email"
            onChange={myForm.handleChange}
            className={myForm.errors.email ? 'form-control is-invalid' : 'form-control'}
          />
          {myForm.errors.email ? <small>{myForm.errors.email}</small> : ''}
        </div>

        <div className="form-group mt-3">
          <label>סיסמה</label>
          <input
            name="password"
            onChange={myForm.handleChange}
            className={myForm.errors.password ? 'form-control is-invalid' : 'form-control'}
          />
          {myForm.errors.password ? <small>{myForm.errors.password}</small> : ''}
        </div>

        <button type="submit" className="btn btn-warning mt-5">הכנס</button>
      </form>
      {IsErr ? <p>{err.toString()}</p> : ''}
    </div>
  );
};

export default LogIn;
