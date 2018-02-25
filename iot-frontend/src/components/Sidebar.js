import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../styles/sidebar.css'

class Sidebar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            redirect: false
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.setItem('currentUser', null)
        this.setState({redirect: true});
    }

    render(){
        if (this.state.redirect) 
            return <Redirect to='/user/login'/>;
        return(
            <div className="sidebar">
                <div className="sidebar-header">IOT PROJECT</div>
                <div className="sidebar-user-info">
                    <div className="user-image">
                        <img src={this.props.user.image} />
                    </div>
                    <div className="user-name">{this.props.user.name}</div>
                </div>
                <div className="sidebar-menu">
                    <ul className="sidebar-list">
                        <li className="sidebar-item">
                            <Link to ='/board/create' >
                                <span className="item-title">Create Board</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to ='/boards' >
                                 <span className="item-title">Boards List</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-logout" onClick={this.logout}>
                    <div>LOGOUT</div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user  
    }
}

export default connect(mapStateToProps)(Sidebar);