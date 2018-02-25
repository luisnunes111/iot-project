import axios from 'axios';

export function getBoards(username) {
    return function(dispatch){
        dispatch({type: 'BOARD_LIST_PENDING', payload: true});

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3001/boards/', 
            headers: {
                // "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            params: {'username': username}
        }).then(response => {
            console.log(response)
           
            if (response.status === 200)
                dispatch({type: 'BOARD_LIST_FULFILLED', payload: response.data.data});                               
            else
                dispatch({type: 'BOARD_LIST_ERROR', payload: response.response.data});              
        }).catch((response) => dispatch({type: 'BOARD_LIST_ERROR', payload: response.response.data})); 
    }
}

export function getBoard(username, id) {
    return function(dispatch){
        dispatch({type: 'BOARD_DETAILS_PENDING', payload: true});

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3001/board/'+id, 
            headers: {
                // "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            params: {'username': username}
        }).then(response => {
            console.log(response)
           
            if (response.status === 200)
                dispatch({type: 'BOARD_DETAILS_FULFILLED', payload: response.data.data});                               
            else
                dispatch({type: 'BOARD_DETAILS_ERROR', payload: response.response.data});              
        }).catch((response) => dispatch({type: 'BOARD_DETAILS_ERROR', payload: response.response.data})); 
    }
}

export function createBoard(data) {
    return function(dispatch){
        dispatch({type: 'BOARD_CREATE_PENDING', payload: true});
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:3001/board/', 
            headers: {
                // "Authorization": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(response => {
            console.log(response)
           
            if (response.status === 201)
                dispatch({type: 'BOARD_CREATE_FULFILLED', payload: response.data});                               
            else
                dispatch({type: 'BOARD_CREATE_ERROR', payload: response.response.data});              
        }).catch((response) => dispatch({type: 'BOARD_CREATE_ERROR', payload: response.response.data}));     
    } 
}



