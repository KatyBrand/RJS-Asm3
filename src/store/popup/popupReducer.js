//POP-UP Reducer
//Save type in variable so it is unique
import { SHOW_POPUP } from "./popupAction";
import { HIDE_POPUP } from "./popupAction";

const initialState = {
  showPopUp: false,
  productShown: {},
};

//SWITCH 2 CASES to SHOW and HIDE popup
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POPUP:
      return {
        showPopUp: true,
        productShown: action.payload,
      };
    case HIDE_POPUP:
      return {
        showPopUp: false,
        productShown: state,
      };
  }
  return state;
};

export default productReducer;
