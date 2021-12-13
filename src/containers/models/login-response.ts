export class LoginResponse{
  token!:String;
  user!: {
    _id:String,
    name:String,
    email:String,
    role:String,
    verified:Boolean,
    verification:String
  }
}
