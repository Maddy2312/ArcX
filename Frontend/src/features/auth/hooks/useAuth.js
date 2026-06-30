import { login, register } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async (formData) => {
    try {
      const data = await register(formData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    handleRegister,
    handleLogin,
  };
};
export default useAuth;
