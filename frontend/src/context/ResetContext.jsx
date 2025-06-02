import { createContext, useState, useContext} from 'react';

const ResetContext = createContext();

export function ResetProvider({ children }) {
    const [resetMessage, setResetMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetTriggered, setResetTriggered] = useState(false);

    const triggerReset = (message, success) => {
        setResetMessage(message);
        setResetSuccess(success);
        setResetTriggered(true);

        setTimeout(() => {
            setResetTriggered(false);
        }, 100);
    };

    return (
        <ResetContext.Provider value={{ resetMessage, resetSuccess, resetTriggered, triggerReset, setResetMessage}}>
            {children}
        </ResetContext.Provider>
    );
}

export function useReset() {
    return useContext(ResetContext);
}