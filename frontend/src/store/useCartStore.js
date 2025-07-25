import {create} from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subTotal: 0,
  coupon: null,
  couponApplied: false,
  loading: false,

  removeCoupon: () => {
    set({ coupon: null, couponApplied: false });
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupon/validate", { code });
      set({ coupon: response.data.data, couponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  addItemToCart: async (product) => {
    set({loading: true});
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();

    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  getCartItems: async () => {
    set({loading: true});
    try {
      const res = await axios.get('/cart');
      console.log(res.data.data)
      set({cart: res.data.data});
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  removeItemFromCart: async (productId) => {
    set({loading: true});
    try {
      const res = await axios.delete(`/cart/${productId}`);
      set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  clearCart: async () => {
    set({loading: true});
    try {
      const res = await axios.delete('/cart');
      set({cart: res.data.data, coupon: null, couponApplied: false});
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({loading: true});
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }

      await axios.patch(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subTotal;

    if (coupon) {
      const discount = subTotal * (coupon.discountPercentage / 100);
      total = subTotal - discount;
    }

    // console.log(subtotal, total);
    set({ subTotal: subTotal, total: total});
  },

  validateCoupon: async(code) => {
    set({ loading: true });
    try {
      const res = await axios.post('/coupon/validate', {code});
      set({ coupon: res.data.data.code,  couponApplied: true });
      toast.success('Coupon applied successfully');
      calculateTotals();
    } catch (error) {
      return toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({ loading: false });
    }
  },

  createOrder: async () => {
    set({loading: true});
    const {cart, total} = get();
    try {
      await axios.post('/cart/create-order', {cart, totalAmount: total});
      toast.success('Order created successfully');
    } catch (error) {
      return toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  }

}))