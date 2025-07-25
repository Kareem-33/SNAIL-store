import {create} from 'zustand'
import {toast} from 'react-hot-toast'

import axios from '../lib/axios.js'

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async({name, email, password, confirmPassword}) => {
    set({loading: true});
    if(password !== confirmPassword) {
      set({loading: false});
      return toast.error('Passwords do not match');
    }
    try {
      const response = await axios.post('/auth/signup', {name, email, password});
      const message = response.data.message;
      set({user: response.data.user});
      return toast.success(message);
    } catch (error) {
      return toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({loading: false});
    }
  },

  login: async ({email, password}) => {
    set({loading: true});
    try {
      const response = await axios.post('/auth/login', {email, password});
      const message = response.data.message;
      set({user: response.data.user});
      return toast.success(message);
    } catch (error) {
      return toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({loading: false});
    }
  },

  logout: async() => {
    set({loading: true});
    try {
      const response = await axios.post('/auth/logout');
      const message = response.data.message;
      set({user: null});
      return toast.success(message);
    } catch (error) {
      return toast.error(error.response.data.message || "An error occurred");
    } finally {
      set({loading: false});
    }
  },

  checkAuth: async() => {
    set({checkingAuth: true});
    try {
      const response = await axios.get('/auth/profile');
      set({user: response.data.data});
    } catch (error) {
      if (error.response?.status == 401) {
        set({ authUser: null });
      } else {
        console.log("Error in checkAuth: ", error);
      }
    } finally {
      set({checkingAuth: false});
    }
  }
}))

export default useAuthStore;