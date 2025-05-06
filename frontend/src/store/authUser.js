import {create} from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useAuthUser = create((set) => ({
  user: null,
  isLoadingSignup: false,
  signup: async (credentials) => {
    set({isLoadingSignup: true});
    try {
      const res = await axios.post("/api/v1/auth/signup", credentials);
      set({user: res.data});
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.error);
      set({user: null});
    } finally {
      set({isLoadingSignup: false});
    }
  },
  isLoadingLogin: false,
  login: async (credentials) => {
    set({isLoadingLogin: true});
    try {
      const res = await axios.post("/api/v1/auth/login", credentials);
      toast.success("Logged in successfully");
      set({user: res.data});
    } catch (error) {
      toast.error(error.response.data.error);
      set({user: null});
    } finally {
      set({isLoadingLogin: false});
    }
  },
  isLoadingLogout: false,
  logout: async () => {
    set({isLoadingLogout: true});
    try {
      const res = await axios.post("/api/v1/auth/logout");
      toast.success(res.data.message);
      set({user: null});
    } catch (error) {
      set({user: null});
      toast.error(error.response.data.error);
    } finally {
      set({isLoadingLogout: false});
    }
  },
  isLoadingAuthCheck: true,
  authCheck: async () => {  
    set({isLoadingAuthCheck: true});
    try {
      const res = await axios.get("/api/v1/auth/me");
      set({user: res.data});
    } catch (error) {
      set({user: null});
    } finally {
      set({isLoadingAuthCheck: false});
    }
  },
}));