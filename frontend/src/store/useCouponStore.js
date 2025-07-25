import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCouponStore = create((set, get) => ({
  coupons: [],
  loading: false,

  getCoupons: async () => {
    set({loading: true});
    try {
      const res = await axios.get('/coupon');
      set({coupons: res.data.data});
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  createCoupon: async (couponData) => {
    set({loading: true});
    try {
      const res = await axios.post('/coupon', couponData);
      set((prevState) => ({
        coupons: [...prevState.coupons, res.data.data],
      }));
      toast.success(res.data.message || 'Coupon created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  deleteCoupon: async(id) => {
    set({loading: true});
    try {
      const res = await axios.delete(`/coupon/${id}`);
      set((prevState) => ({
        coupons: prevState.coupons.filter((coupon) => coupon._id !== id),
      }))
      toast.success(res.data.message || 'Coupon deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  }

}))