export function UserReducer(state, action) {
  switch (action.type) {
    case "submit":
      return {
        ...state,
        first_name: action.first_name,
        last_name: action.last_name,
        email: action.email,
        reference: action.reference,
        submitted: action.submitted,
      };
    case "signUpdate":
      return { ...state, sign: action.sign };
    case "signIn":
      // We don't want the other state saved because it might be a different user's information. We just want to know if they signed
      // out of google or not.
      return {
        ...state.sign,
        email: action.email,
        first_name: action.first_name,
        last_name: action.last_name,
        submitted: action.submitted,
      };
    case "updateEvents":
      return { ...state, events: action.events };
    case "log_out":
      return {
        first_name: "",
        last_name: "",
        email: "",
        reference: "",
        submitted: false,
        sign: false,
      };
    default:
      throw new Error(`User Reducer does not recognize ${action.type}`);
  }
}
