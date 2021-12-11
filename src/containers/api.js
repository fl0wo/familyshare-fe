const axios = require('axios');

let jwt = null;
const BASEURL = "http://localhost:3000";

const login = async (email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);

    return axios.post(BASEURL + "/login",params)
        .then((res)=>{
            jwt = res.data.token;
            return jwt;
        })
        .catch(err=>{
            alert(JSON.stringify(err));
            return null;
        });
}

const register = async (name, email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);
    params.append('name', name);

    return axios.post(BASEURL + "/register",params)
        .then((res)=>{
            alert(JSON.stringify(res));
            jwt = res.data.token;
            return jwt;
        })
        .catch(err=>{
            alert(JSON.stringify(err));
            return null;
        });
}

const getMyKids = async () => {

    if (jwt==null) return null;

    return axios.get(BASEURL + "/positions/",{
            headers: {Authorization: 'Bearer ' + jwt}})
        .then((res)=>{
            return res;
        })
        .catch(err=>{
            alert(JSON.stringify(err));
            return null;
        });
}

export {register,login, jwt, getMyKids}