export const initialState = {
  user: null,
  adminData: { value: false, data: null },
  userData: null,
  cart: { value: false, error: false, errorMSg: "", data: null },
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USER_DETAILS: "USER_DETAILS",
  SET_ADMIN_DETAILS: "ADMIN_DETAILS",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_ADMIN_DETAILS:
      return {
        ...state,
        adminData: action.adminData,
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userData: action.userData,
      };

    default:
      return state;
  }
};

export default reducer;
