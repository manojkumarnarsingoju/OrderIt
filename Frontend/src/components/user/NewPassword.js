import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword,clearErrors } from '../../actions/userActions';
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm]= useState("");
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error,success} = useSelector((state) => state.forgotPassword);
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("password updated succesfully ");
            navigate("/users/login");
         }
        
    },[dispatch,alert, error, success, navigate]);

    const submitHandler =(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);

        dispatch(resetPassword(token, formData));
    };
  return (
    <>
  <div className='row wrapper'>
 <div className='col-10 col-lg-5'>
    <form className='shadow-lg' onSubmit={submitHandler}>
<h1 className='mb-3'> New Password</h1>
<div className='form-group'>
<label htmlFor='password_field'> Enter Password </label>
<input
type='password'
id='password_field'
className='form-control'
value={password}
onChange={(e)=> setPassword(e.target.value)}
>
</input>
</div>
<div className='form-group'>
<label htmlFor='confirm_password_field'> Confirm Password </label>
<input
type='password'
id='confirm_password_field'
className='form-control'
value={passwordConfirm}
onChange={(e)=> setPasswordConfirm(e.target.value)}
>
</input>
</div>
<button
id='new_password_button'
type='submit'
className='btn btn-block py-3'
disabled ={loading ? true:false}
>
Set Password
</button>
    </form>
 </div>
  </div>
  
  </>
  )
}

export default NewPassword;
