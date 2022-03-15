import { createContext, useReducer } from 'react'
import AuthReducer from './UserReducer'

const INITIAL_STATE = {
    user: {
        "_id": "6214bbbedfe153fa2ad5fae8",
        "username": "daniel",
        "email": "daniel@wp.pl",
        "profilePicture": "person/1.png",
        "coverPicture": "",
        "followers": [],
        "followings": [],
        "isAdmin": false,
        "updatedAt": "2022-03-11T19:09:31.345Z",
        "__v": 0
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}