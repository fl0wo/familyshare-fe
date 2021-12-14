export default (state: any,
                action: { type: any; payload: any; }
) => {
  switch (action.type) {
    case "base":
      return action.payload
    default:
      return state;
  }
};