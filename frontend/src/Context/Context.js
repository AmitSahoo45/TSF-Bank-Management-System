import React, { useState, createContext } from "react";

export const BankingStore = createContext();

export const BankingProvider = ({ children }) => {
    const [AllUserData, setAllUserData] = useState([]);
    const [UserData, setUserData] = useState([]);

    return (
        <BankingStore.Provider value={{
            AllUserData, setAllUserData,
            UserData, setUserData
        }}>
            {children}
        </BankingStore.Provider>
    );
};