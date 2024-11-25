import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

// Define the initial state of the cart
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: parseFloat(localStorage.getItem("cartTotalAmount")) || 0,
};

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_CART: "CLEAR_CART",
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.price,
      };

    case ACTIONS.REMOVE_ITEM:
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToRemove) return state;

      let updatedItemsafterRemove =
        itemToRemove.quantity > 1
          ? state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          : state.items.filter((item) => item.id !== action.payload.id);

      return {
        ...state,
        items: updatedItemsafterRemove,
        totalAmount: state.totalAmount - action.payload.price,
      };

    case ACTIONS.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
    localStorage.setItem("cartTotalAmount", state.totalAmount.toString());
  }, [state.items, state.totalAmount]);

  const addItemToCart = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
    toast.success("Product Added Successfully ");
  };

  const removeItemFromCart = (id, price) =>
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { id, price } });
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalAmount");
  };

  const value = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
