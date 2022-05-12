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

    default:
      throw new Error(`Todo Reducer does not recognize ${action.type}`);
  }
}
