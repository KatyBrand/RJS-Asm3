export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const ADD_ITEM_QUANTIFY_CART = "ADD_ITEM_QUANTIFY_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART_FROM_LOCAL_STORAGE = "UPDATE_CART_FROM_LOCAL_STORAGE";
export const CLEAR_CART_ON_LOG_OUT = "CLEAR_CART_ON_LOG_OUT";

export const addToCart = (item) => ({
  type: ADD_CART,
  payload: item,
});

export const updateCartItem = (itemId, quantity) => ({
  type: UPDATE_CART,
  payload: { itemId, quantity },
});

export const deleteFromCart = (itemId) => ({
  type: DELETE_CART,
  payload: itemId,
});
export const addItemQuantityCart = (item, quantity) => ({
  type: ADD_ITEM_QUANTIFY_CART,
  payload: { item, quantity },
});

export const updateCartFromLS = (items) => ({
  type: UPDATE_CART_FROM_LOCAL_STORAGE,
  payload: items,
});
