const initialState = {
    boards: { 
        data: [], 
        details: null,  
        createState:{           
            pending: false,
            success: false,
            error: {
                state: false,
                msg: null
            }
        },
        listState:{
            pending: false,  
            success: false,
            error: {
                state: false,
                msg: null
            }    
        },
        detailsState:{
            pending: false,  
            success: false,
            error: {
                state: false,
                msg: null
            }    
        }
    },
    reads: [],
    user: { 
        name: null,
        username: null,
        image: null,
        registerState:{           
            pending: false,
            success: false,
            error: {
                state: false,
                msg: null
            }
        },
        loginState:{
            pending: false,  
            success: false,
            error: {
                state: false,
                msg: null
            }    
        }
    } 
};
  
export default initialState;