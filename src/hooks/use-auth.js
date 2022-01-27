import { useSelector } from "react-redux";

export const useAuth = () => {
    const { email, id } = useSelector(state => state.auth);
    return {
        isAuth: !!email,
        email,
        id
    };
}