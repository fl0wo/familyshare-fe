const axios = require('axios');

const login = async (email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);

    axios.post("http://localhost:3000/login",params)
        .then((res)=>{
            alert(JSON.stringify(res));
        })
        .catch(err=>{
            alert(JSON.stringify(err));
        });
}

const register = async (name, email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);
    params.append('name', name);

    axios.post("http://localhost:3000/register",params)
        .then((res)=>{
            alert(JSON.stringify(res));
        })
        .catch(err=>{
            alert(JSON.stringify(err));
        });
}

export {register,login}