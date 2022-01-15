import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle, Password } from '@mui/icons-material';
import Box from '@mui/material/Box';

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const underLineBtn={
    textDecoration: 'underline',
    backgroundColor: 'Transparent',
    backgroundRepeat:'no-repeat',
    border: 'none',
    cursor:'pointer',
    overflow: 'hidden',
    outline: 'none',
}

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};
const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};
const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block'
};
const Field = React.forwardRef(({label, type, inputPlace}, ref) => {
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input ref={ref} type={type} style={inputStyle} placeholder={inputPlace}/>
        </div>
    );
});
function LoginForm({onSubmit}){

    let [email,setEmail]= useState('test@gmail.com')
    let [pwd,setPwd]= useState('test1234')
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: email,
            password: pwd
        };
        onSubmit(data);
    };


    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  required={true}
                  variant="standard"
                           value={email}
                           onChange={e=>setEmail(e.target.value)}
                           inputPlace="test@gmail.com"
                           label="Email"
                           type="email"/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  required={true}
                  variant="standard"
                           value={pwd}
                           onChange={e=>setPwd(e.target.value)}
                           label="Password" type="password"/>
            </Box>
            <div>
                <Button
                  onClick={handleSubmit}
                  variant="outlined">Login</Button>
            </div>
        </div>
    );
};
function RegisterForm({onSubmit}){

    let [name,setName]= useState('')
    let [email,setEmail]= useState('')
    let [pwd,setPwd]= useState('')

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: pwd
        };
        onSubmit(data);
    };
    return (

      <div>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                required={true}
                variant="standard"
                         value={name}
                         onChange={e=>setName(e.target.value)}
                         inputPlace="Test"
                         label="Username"
                         type="text"/>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                required={true}
                variant="standard"
                         value={email}
                         onChange={e=>setEmail(e.target.value)}
                         inputPlace="test@gmail.com"
                         label="Email"
                         type="email"/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                required={true}
                variant="standard"
                         value={pwd}
                         onChange={e=>setPwd(e.target.value)}
                         label="Password" type="password"/>
          </Box>
          <div>
              <Button
                onClick={handleSubmit}
                variant="outlined">Register</Button>
          </div>
      </div>
    );
};

LoginForm.displayName='Login'
RegisterForm.displayName='Register'
Field.displayName = 'Fiffo'

export {LoginForm,RegisterForm};