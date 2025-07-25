import {create} from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({products}),

  createProduct: async (productData) => {
    set({loading: true});
    try {
      const res = await axios.post('/products', productData);
      set((prevState) => ({
        products: [...prevState.products, res.data]
      }))
      toast.success(res.data.message || 'Product created successfully');
      return 0;
    } catch (error) {
      if(error.status === 413) return toast.error('Image size is too large');
      toast.error(error.response?.data?.message || 'An error occurred');
      return 1;
    } finally {
      set({loading: false});
    }
  },

  getProducts: async () => {
    set({loading: true});
    try {
      const res = await axios.get('/products');
      set({products: res.data.data});
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({loading: false});
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter((product) => product._id !== productId),
      }));
    } catch (error) {
      toast.error(error.response.data.error || "Failed to delete product");
    } finally {
      set({ loading: false });
    }
  },
  
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId ? { ...product, isFeatured: response.data.data.isFeatured } : product
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.error || "Failed to update product");
    } finally {
      set({ loading: false });
    }
  },

  getProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.data });
    } catch (error) {
      set({products: []});
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      set({ loading: false });
    }
  },

}))