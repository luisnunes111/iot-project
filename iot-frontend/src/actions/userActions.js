import axios from 'axios';

export function signUpUser(data) {
    return function(dispatch){
        dispatch({type: 'USER_SIGNUP_PENDING', payload: true});
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:3001/register/', 
            headers: {
                // "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(response => {
            console.log(response)
           
            if (response.status === 201){
                dispatch({type: 'USER_SIGNUP_FULFILLED', payload: response.data});   
            }                
            else
                dispatch({type: 'USER_SIGNUP_ERROR', payload: response.response.data});              
        }).catch((response) => dispatch({type: 'USER_SIGNUP_ERROR', payload: response.response.data}));       
    } 
}

export function signInUser(data) {
    return function(dispatch){
        dispatch({type: 'USER_SIGNIN_PENDING', payload: true});
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:3001/login/', 
            headers: {
                // "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(response => {
            console.log(response)
           
            if (response.status === 200){
                localStorage.setItem('currentUser', JSON.stringify({user: response.data}))
                dispatch({type: 'USER_SIGNIN_FULFILLED', payload: response.data});   
            }                
            else
            dispatch({type: 'USER_SIGNIN_ERROR', payload: response.response.data});              
        }).catch((response) => dispatch({type: 'USER_SIGNIN_ERROR', payload: response.response.data}));       
    } 
}
