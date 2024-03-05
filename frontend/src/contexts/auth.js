import React, { useContext, useState, useEffect, createContext } from "react";


import api from '../services/api';
import { useRouter } from 'next/router'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        async function loadUser() {
            // get token from cookies

            let token = localStorage.getItem('token');
            // if there is a token
            if (token){
                if (token!=='undefined') {
                    console.log(token==='undefined')
                    token = JSON.parse(token);
                    // set header default bearer token
                    api.defaults.headers.Authorization = `Bearer ${token.access_token}`;
                    // get user data from backend
                    const { data: user } = await api.get('users/me').catch(error=>{console.log(error)})
                    //  assign user state once we get user from backend
                    if (user) setUser(user);
                }
            }
            setLoading(false);
        }
        loadUser();
    }, [])

    const login = async (e) => {
        e.preventDefault();
        const { data: token } = await api.post(
            '/api/token',
            {
                'username': e.target.email.value,
                'password': e.target.password.value,
            })
        if (token) {
            console.log("Got token");
            localStorage.setItem('token', JSON.stringify(token));
            const { data: user } = await api.get(
                'users/me',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token.access_token
                    }
                }
            );
            setUser(user);
            console.log("Got user", user);
            router.push("/");
            
        }
    }

    const signup = async (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        console.log(e.target.password.value)
        setLoading(true)
        const { data: token } = await api.post(
            '/api/signup',
            {
                'username': e.target.email.value,
                'password': e.target.password.value,
            }
        )
        if (token) {
            console.log("Got token");
            console.log(token)
            setLoading(false)
            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${token.access_token}`;
            console.log(api.defaults.headers.Authorization)
            const { data: user } = await api.get('users/me');
            setUser(user);
            console.log("Got user", user);
            router.push("/");
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.Authorization;
        // router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, signup, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export const AuthConsumer = AuthContext.Consumer;


// export const ProtectRoute = ({children}) => {
//     const {isAuthenticated, isLoading} = useAuth();
//     if (isLoading || !isAuthenticated ){
//         return <LoadingScreen/>;
//     }
//     return children;
// }

