import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';
import '../styles.css';
import NavBar from '../components/navbar';

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const { name, lastname, email, password } = data; //INPUTS BOXES

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const createUser = async () => {
    const url = 'http://localhost:3001/api/user';
    try {
      const newData = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      };
      //HTTP-REQUEST SENT TO API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      //RESPONSE FROM API TO CLIENT_SIDE
      const json = await response.json();
      //   console.log(json);
      if (
        json.msg ===
        "User couldn't be created. Another user was previously created"
      ) {
        swal(
          'ERROR',
          "User couldn't be created. Another user was previously created",
          'error'
        );
      } else {
        swal('SUCCESSFUL', 'User was successfully created', 'success');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during Sign_Up process:', error);
      // Mostrar un mensaje de error al usuario
      swal('Error', 'Server Error during login process.', 'error');
    }
  };

  return (
    <div className='container-login'>
      <div className='inside-container-login'>
        <h1 className=''>Sign Up</h1>

        <form className='login-form' onSubmit={onSubmit} id='formulario'>
          <div className='name'>
            <label className='label-name label'>Name</label>
            <input
              className='input-name input'
              id='name'
              type='text'
              name='name'
              placeholder='Name'
              required
              value={name}
              onChange={onChange}
            ></input>
          </div>

          <div className='lastname'>
            <label className='label-lastname label'>Lastname</label>
            <input
              className='input-lastname input'
              id='lastname'
              type='text'
              name='lastname'
              placeholder='lastname'
              required
              value={lastname}
              onChange={onChange}
            ></input>
          </div>

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
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
