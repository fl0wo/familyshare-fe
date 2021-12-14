import { createStore } from "redux";
import reducer from '../utils/reducer'

function configureStore(base:any ={
  jwt: null,
  map: null,
  user:null,
  events:null,
  isLive:true,
  selectedPaths:[],
  livePaths:[]
}) {
  return createStore(reducer,base);
}

export default configureStore;
