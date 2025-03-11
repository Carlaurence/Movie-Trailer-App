import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';
import '../styles.css';
import NavBar from '../components/navbar';

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data; //INPUTS BOXES

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    const url = 'http://localhost:3001/api/auth';
    try {
      const newData = {
        email: data.email,
        password: data.password,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const json = await response.json();
      //   console.log(json);

      if (json.msg === "User doesn't exist") {
        swal('ERROR', 'User does not exist', 'error');
      } else if (json.msg === 'email or password incorrect') {
        swal('ERROR', 'email or password incorrect', 'error');
      } else {
        const token = json.token;
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Mostrar un mensaje de error al usuario
      swal('Error', 'Server Error during login process.', 'error');
    }
  };

  return (
    <div className='container-login'>
      <div className='inside-container-login'>
        <h1 className=''>Log In</h1>

        <form className='login-form' onSubmit={onSubmit} id='formulario'>
          <div className='email'>
            <label className='label-email label'>Email</label>
            <input
              className='input-email input'
              id='email'
              type='email'
              name='email'
              placeholder='Email'
              required
              value={email}
              onChange={onChange}
            ></input>
          </div>

          <div className='password'>
            <label className='label-password label'>Password</label>
            <input
              className='input-password input'
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              required
              value={password}
              onChange={onChange}
            ></input>
          </div>

          <button className='btn-submit btn-form' type='submit'>
            Log In
          </button>
        </form>
        <button
          className='btn-signup btn-form'
          onClick={() => {
            navigate('/signup');
          }}
        >
          Create new Account
        </button>
      </div>
    </div>
  );
};

export default Login;
