import React, { FC, useState, useEffect } from 'react';
import './logIn.scss';
import LogInUser from '../../models/LogInUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../Redux/store';
import { logIn } from '../../Redux/features/personSlice';

interface LogInProps {}

const LogIn: FC<LogInProps> = (props: LogInProps) => {
  const [err, setErr] = useState<string>('');
  const [IsErr, setIsErr] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const myForm = useFormik({
    initialValues: new LogInUser('email@gmail.com', '1234#'),
    onSubmit: async (valueForm: LogInUser) => {
      try {
        await dispatch(logIn(valueForm)).unwrap(); // Unwrap to handle success/errors directly
      } catch (err) {
        console.error("Login failed:", err);
        setIsErr(true)
        setErr("משתמש לא קיים")
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

  return (
    <div className="user-details">
      <form onSubmit={myForm.handleSubmit} className="col-sm-5 m-5">
        {/* <h2>{props.children}</h2> */}

        <div className="row">
          <div className="col-sm-8">
            <input
              name="email"
              onChange={myForm.handleChange}
              className={myForm.errors.email ? 'form-control is-invalid' : 'form-control'}
            />
            {myForm.errors.email && <small>{myForm.errors.email}</small>}
          </div>
          <div className="col-sm-2 mt-2">
            <label>אימייל</label>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <input
              name="password"
              onChange={myForm.handleChange}
              className={myForm.errors.password ? 'form-control is-invalid' : 'form-control'}
            />
            {myForm.errors.password && <small>{myForm.errors.password}</small>}
          </div>
          <div className="col-sm-2 mt-2">
            <label>סיסמה</label>
          </div>
        </div>

        <button type="submit" className="btn btn-warning mt-2">הכנס</button>
      </form>
      {IsErr && <p>{err.toString()}</p>}
    </div>
  );
};

export default LogIn;
