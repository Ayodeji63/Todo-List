import { useAuth } from "./AuthContext"

export const useUnique = () => {
    const {data} = useAuth();
    return String(data.password)
}