import { useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        // console.log(isMounted);
        if (isMounted) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                    // const uid = user.uid;

                }
                setCheckingStatus(false)

            })
        }

        return () => {
            isMounted.current = false;
        }

    },[isMounted])

    return { loggedIn, checkingStatus }

}


