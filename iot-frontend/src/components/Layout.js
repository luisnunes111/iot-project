import React from 'react';
import { Provider } from 'react-redux';  
import configureStore from '../store/configureStore';

import Routes from "../routes";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import '../styles/layout.css'
// !localStorage.getItem('currentUser').length !== "[object Object]")
console.log(localStorage.getItem('currentUser'))
const session = (localStorage.getItem('currentUser') !== null && JSON.parse(localStorage.getItem('currentUser')) !== null)? JSON.parse(localStorage.getItem('currentUser')) : {}
const store = configureStore(session)

export default class Layout extends React.Component {
    
    render(){
        
        {console.log(store.getState())}
        return (
            <Provider store={store}>
                <div id="wrapper">
                    <Sidebar />
                    <div id="content">
                        <Routes />
                        <Footer /> 
                    </div>                  
                </div>  
            </Provider>
            
        );
    }

}    