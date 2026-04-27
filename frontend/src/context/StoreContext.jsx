import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "stylehub-store-v1";

const initialState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  toasts: [],
  user: null,
  orders: [],
  coupon: "",
};

function loadInitialState() {
  try {
    const fromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!fromStorage) return initialState;
    return { ...initialState, ...fromStorage, toasts: [] };
  } catch {
    return initialState;
  }
}

function saveState(state) {
  const payload = {
    cart: state.cart,
    wishlist: state.wishlist,
    recentlyViewed: state.recentlyViewed,
    user: state.user,
    orders: state.orders,
    coupon: state.coupon,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1, size, color } = action.payload;
      const key = `${product.id}-${size || "NA"}-${color || "NA"}`;
      const existing = state.cart.find((item) => item.key === key);
      const cart = existing
        ? state.cart.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [
            ...state.cart,
            {
              key,
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              quantity,
              size: size || product.sizes[0] || "M",
              color: color || product.colors[0] || "Black",
            },
          ];
      return {
        ...state,
        cart,
        toasts: [...state.toasts, { id: uid(), type: "success", message: `${product.name} added to cart.` }],
      };
    }
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.key !== action.payload),
        toasts: [...state.toasts, { id: uid(), type: "info", message: "Item removed from cart." }],
      };
    case "UPDATE_QTY": {
      const { key, quantity } = action.payload;
      const cart = state.cart
        .map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0);
      return { ...state, cart };
    }
    case "TOGGLE_WISHLIST": {
      const id = action.payload;
      const exists = state.wishlist.includes(id);
      return {
        ...state,
        wishlist: exists ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id],
        toasts: [
          ...state.toasts,
          {
            id: uid(),
            type: "info",
            message: exists ? "Removed from wishlist." : "Saved to wishlist.",
          },
        ],
      };
    }
    case "ADD_RECENT": {
      const id = action.payload;
      const recentlyViewed = [id, ...state.recentlyViewed.filter((x) => x !== id)].slice(0, 8);
      return { ...state, recentlyViewed };
    }
    case "DISMISS_TOAST":
      return { ...state, toasts: state.toasts.filter((toast) => toast.id !== action.payload) };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_COUPON":
      return { ...state, coupon: action.payload };
    case "PLACE_ORDER": {
      const order = {
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "Processing",
        ...action.payload,
      };
      return {
        ...state,
        orders: [order, ...state.orders],
        cart: [],
        toasts: [...state.toasts, { id: uid(), type: "success", message: "Order placed successfully." }],
      };
    }
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  const cartSubtotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.cart],
  );

  const tax = useMemo(() => cartSubtotal * 0.08, [cartSubtotal]);
  const shipping = useMemo(() => (cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 8), [cartSubtotal]);
  const discount = useMemo(() => (state.coupon.toUpperCase() === "STYLE10" ? cartSubtotal * 0.1 : 0), [cartSubtotal, state.coupon]);
  const total = useMemo(() => Math.max(0, cartSubtotal + tax + shipping - discount), [cartSubtotal, tax, shipping, discount]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const api = {
    state,
    cartSubtotal,
    tax,
    shipping,
    discount,
    total,
    addToCart: (product, quantity = 1, size, color) => dispatch({ type: "ADD_TO_CART", payload: { product, quantity, size, color } }),
    removeCartItem: (key) => dispatch({ type: "REMOVE_CART_ITEM", payload: key }),
    updateQty: (key, quantity) => dispatch({ type: "UPDATE_QTY", payload: { key, quantity } }),
    toggleWishlist: (id) => dispatch({ type: "TOGGLE_WISHLIST", payload: id }),
    addRecent: (id) => dispatch({ type: "ADD_RECENT", payload: id }),
    dismissToast: (id) => dispatch({ type: "DISMISS_TOAST", payload: id }),
    setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
    setCoupon: (coupon) => dispatch({ type: "SET_COUPON", payload: coupon }),
    placeOrder: (payload) => dispatch({ type: "PLACE_ORDER", payload }),
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return ctx;
}
