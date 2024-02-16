import { UPDATE_SHOP, FILTER, SHOW_ALL_PROD } from "./shopAction";

const initialState = {
  products: [],
  filteredProducts: [],
};

//SWITCH 3 CASES to Update, filter and show PRODUCTS
const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOP:
      return {
        products: action.data,
      };
    case FILTER:
      const filteredProds = state?.products.filter(
        (prod) => prod.category === action.category
      );
      return {
        products: state.products,
        filteredProducts: filteredProds,
      };
    case SHOW_ALL_PROD:
      return {
        products: state.products,
        filteredProducts: state.products,
      };
  }

  return state;
};

export default productListReducer;
