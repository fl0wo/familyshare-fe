export interface PositionsResponse{
  _id:String
  who:String
  color:String
  positions:[{
    coords:{
      lat:Number
      long:Number
    }
    _id:String
    timestamp:Number
  }]
}
