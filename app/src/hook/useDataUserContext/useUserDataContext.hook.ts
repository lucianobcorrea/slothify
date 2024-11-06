import { useContext } from "react";
import { UserDataContext } from "@/context/userData.context";

export const useUserDataContext = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error('useUserDataContext must be used within an UserDataProvider');
    }
    return context;
};