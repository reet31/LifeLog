import axios from "axios";

export const checkauthentication = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/me",
             { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Authentication check failed:", error);
        return null;
    }
};