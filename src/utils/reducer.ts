export default (state: any,
                action: { type: any; payload: any; }
) => {
  switch (action.type) {
    case "base":
      return action.payload
    case "livepath":
      return {
        ...state,
        livePaths : action.payload
      }
    case "liveupdate":
      return {
        ...state,
        wantMore : action.payload
      }
    case "selectedpath":
      return {
        ...state,
        selectedPaths : action.payload
      }
    case "newuser" :
      alert(JSON.stringify(action.payload))
      console.log(JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};