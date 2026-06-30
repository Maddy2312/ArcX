import { register } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async (data) => {
    try {
      const response = await register(data);
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      dispatch(setUser(response.data));
      return response.data;
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
