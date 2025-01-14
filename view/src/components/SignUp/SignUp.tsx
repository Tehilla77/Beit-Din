import React, { FC, useState } from 'react';
import './SignUp.scss';
import User from '../../models/User';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { createUser } from '../../Redux/features/personSlice';
import { useAppDispatch } from '../../Redux/store';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = (props: SignUpProps) => {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string>('');
  const [IsErr, setIsErr] = useState<boolean>(false);
  const myForm = useFormik({
    initialValues: new User("id", "password", "first_name", "last_name", "email", "phone", "address", 0),
    onSubmit: async (valueForm: User) => {
      try {
        await dispatch(createUser(valueForm));
      } catch (err: any) {
        setIsErr(true);
        setErr(err.message || 'An error occurred');
        console.error('SignUp error:', err);
      }
    },
    validationSchema: Yup.object().shape({
      role: Yup.number()
        .required("Role is required")
        .oneOf([1, 2], "Invalid type selected"),
      id: Yup.string().required().min(9).max(9),
      password: Yup.string().required().min(8)
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
      first_name: Yup.string().required().min(2),
      last_name: Yup.string().required().min(2),
      email: Yup.string().required().email()
    })
  });

  return (
    <div className="user-details">
      <form onSubmit={myForm.handleSubmit} className='col-sm-5'>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='id' onChange={myForm.handleChange} className={myForm.errors.id ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.id && <small>{myForm.errors.id}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>מספר ת.ז</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='password' onChange={myForm.handleChange} className={myForm.errors.password ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.password && <small>{myForm.errors.password}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>סיסמה</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='first_name' onChange={myForm.handleChange} className={myForm.errors.first_name ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.first_name && <small>{myForm.errors.first_name}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>שם פרטי</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='last_name' onChange={myForm.handleChange} className={myForm.errors.last_name ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.last_name && <small>{myForm.errors.last_name}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>שם משפחה</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='email' onChange={myForm.handleChange} className={myForm.errors.email ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.email && <small>{myForm.errors.email}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>כתובת אימייל</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='phone' onChange={myForm.handleChange} className={myForm.errors.phone ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.phone && <small>{myForm.errors.phone}</small>}
          </div>
          <div className='col-sm-3 mt-2'>
            <label>מספר טלפון</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <input name='address' onChange={myForm.handleChange} className={myForm.errors.address ? 'form-control is-invalid' : 'form-control'} />
            {myForm.errors.address && <small>{myForm.errors.address}</small>}
          </div>
          <div className='col-sm-4 mt-2'>
            <label>כתובת</label>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <select name='role' onChange={myForm.handleChange} className={myForm.errors.userRole ? 'form-control is-invalid' : 'form-control'}>
              <option value='1'>בעל דין</option>
              <option value='2'>דיין</option>
            </select>
            {myForm.errors.userRole && <small>{myForm.errors.userRole}</small>}
          </div>
          <div className='col-sm-4 mt-2'>
            <label>סוג</label>
          </div>
        </div>

        <button type='submit' className='btn btn-warning mt-2'>הוסף</button>
      </form>
    </div>
  );
};

export default SignUp;


