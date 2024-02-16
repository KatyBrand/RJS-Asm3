// reducers.js
import {
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  ADD_ITEM_QUANTIFY_CART,
  UPDATE_CART_FROM_LOCAL_STORAGE,
  CLEAR_CART_ON_LOG_OUT,
} from "./cartAction";

const initialState = {
  userEmail: JSON.parse(localStorage.getItem("userEmail")),
  cartItems: [],
};

const saveToLocalStorage = (state, updatedCart) => {
  //No user => not save data on local storage

  if (!state.userEmail) {
    return;
  } else {
    localStorage.setItem(
      `${initialState.userEmail}`,
      JSON.stringify({
        ...state,
        cartItems: updatedCart,
      })
    );
  }
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // Item with same ID exists, increment its quantity
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        saveToLocalStorage(state, updatedCartItems);
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Item with same ID does not exist, add new item
        const newItem = {
          ...action.payload,
          quantity: 1, // Add quantity property with default value 1
        };
        saveToLocalStorage(state, [...state.cartItems, newItem]);
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case UPDATE_CART:
      console.log("update cart");

      saveToLocalStorage(
        state,
        state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      );
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    // IN DETAIL PAGE - Update Cart with product + customized quantity
    case ADD_ITEM_QUANTIFY_CART:
      const existItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.item.id
      );

      if (existItemIndex !== -1) {
        // Item with same ID exists, increment its quantity
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });
        saveToLocalStorage(state, updatedCartItems);
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Item with same ID does not exist, add new item
        const newItem = {
          ...action.payload.item,
          quantity: action.payload.quantity, // Add quantity property with default value
        };
        saveToLocalStorage(state, [...state.cartItems, newItem]);
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    case DELETE_CART:
      saveToLocalStorage(
        state,
        state.cartItems.filter((item) => item.id !== action.payload)
      );
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case UPDATE_CART_FROM_LOCAL_STORAGE:
      saveToLocalStorage(state, action.payload);
      return {
        ...state,
        cartItems: action.payload,
      };
    case CLEAR_CART_ON_LOG_OUT:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
