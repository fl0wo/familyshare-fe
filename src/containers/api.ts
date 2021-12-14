import { LoginResponse } from './models/login-response';
import axios from 'axios';
import { ProfileResponse } from './models/profile-response';
import { PositionsResponse } from './models/positions-response';

let jwt:any = null;
const BASEURL = "http://localhost:3000";

const login = async (email: string, pwd: string) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);

    return axios
      .post<LoginResponse>(BASEURL + "/login", params)
      .then((res)=>{
          jwt=res.data.token;
          return res.data.token;
      })
}

const register = async (name: string, email: string, pwd: string) => {

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', pwd);
    params.append('name', name);

    return axios.post(BASEURL + "/register",params)
        .then((res: { data: { token: String; }; })=>{
            jwt = res.data.token;
            return jwt;
        })
        .catch(handleError);

}

const registerKid = async (name: string, kidId: string) => {
  alert("insert "+ name + " " + kidId)
}


const getMyKids = async () => {
    if (jwt==null) return null;

    return axios.get<PositionsResponse[]>(BASEURL + "/positions/",header(jwt))
        .then(identity)
        .catch(handleError);

}

const me = async () => {
    if (jwt==null) return null;

    return axios.get<ProfileResponse>(BASEURL + "/profile",header(jwt))
        .then(identity)
        .catch(handleError);
}

const myEvent = async (eventId: any) => {
    if (jwt==null) return null;

    return axios.post(BASEURL + "/profile/event/show",
        {
            id : eventId
        },
        header(jwt))
        .then(identity)
        .catch(handleError);
}

function handleError(err: any) {
    alert(JSON.stringify(err));
    return null;
}

function header(jwt: String) {
    return {
        headers: {Authorization: 'Bearer ' + jwt}
    };
}

let identity=(res: any)=>{
  //alert(JSON.stringify(res))
  return res
};

export {register,login, getMyKids, me, myEvent,registerKid }