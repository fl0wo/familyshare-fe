const http = require('axios');

let jwt = null;
const BASEURL = "http://localhost:3000";

const login = async (email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);

    return http.post(BASEURL + "/login",params)
        .then((res)=>{
            jwt = res.data.token;
            return jwt;
        })
        .catch(handleError);

}

const register = async (name, email, pwd) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);
    params.append('name', name);

    return http.post(BASEURL + "/register",params)
        .then((res)=>{
            jwt = res.data.token;
            return jwt;
        })
        .catch(handleError);

}

const getMyKids = async () => {
    if (jwt==null) return null;

    return http.get(BASEURL + "/positions/",header(jwt))
        .then(identity)
        .catch(handleError);

}

const me = async () => {
    if (jwt==null) return null;

    return http.get(BASEURL + "/profile",header(jwt))
        .then(identity)
        .catch(handleError);
}

function handleError(err) {
    alert(JSON.stringify(err));
    return null;
}

function header(jwt) {
    return {
        headers: {Authorization: 'Bearer ' + jwt}
    };
}

let identity=res=>res;

export {register,login, jwt, getMyKids, me}