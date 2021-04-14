export const initialState = {
  user: null,
  adminData: { value: false, data: null },
  userData: null,
  products: { value: false, error: false, errorMSg: "", data: null },
  cart: { value: false, error: false, errorMSg: "", data: null },
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USER_DETAILS: "USER_DETAILS",
  SET_ADMIN_DETAILS: "ADMIN_DETAILS",
  SET_PRODUCTS: "ADMIN_PRODUCTS",
  SET_CART: "ADMIN_CART",
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
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};

export default reducer;
