import React, { createContext, useState } from 'react';
import { Header } from '../components/Header';
import styles from '../assets/css/components/rightpanel.module.css'


const ErrorContext = createContext();

export const MainTemplate = ({children}) => {
    const [errors, setErrors] = useState([])

    return(
        <ErrorContext.Provider value={{errors, setErrors}}>
            <div className="container-fluid p-0">
                <div className="row m-0 vh-100">
                    <Header />
                    {children}
                    <div className={`col-4 ${styles.rightPanel}`}>
                        Col 3
                    </div>
                </div>
            </div>
        </ErrorContext.Provider>
    )

}