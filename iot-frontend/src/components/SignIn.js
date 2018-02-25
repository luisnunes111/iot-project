import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signInUser } from '../actions/userActions';
import { Grid, Row, Col } from 'react-bootstrap';

import '../styles/form.css'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit() {
        this.props.dispatch(signInUser(this.state))
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    render(){

        return(   
            <div>

                <Grid className="dashboard-container" fluid={true}>     
                    <Row className="container-button-row"> 
                        <div className="form-container">
                            <div className="form-header">
                                Login
                            </div>

                            { (this.props.state && ( this.props.state.error && this.props.state.error.state)) && 
                                <div>Error: {this.props.state.error.msg}</div>
                            }

                            { ( this.props.state && this.props.state.success) && 
                                <Redirect to='/boards'/>
                            }
                            { ( this.props.state && this.props.state.pending)  && 
                                <div>sending...</div>
                            }

                            <div className="button-group-form">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="" name="username" placeholder="" onChange={this.handleInputChange}/>
                            </div>
                            <div className="button-group-form">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="" name="password" placeholder="" onChange={this.handleInputChange}/>
                            </div>

                            <div className="button-submit-form">
                                <button onClick={this.handleSubmit}>Enter</button>
                            </div>
                        </div>         
                    </Row>
                </Grid>  
            </div>
        );
    }
}


const mapStateToProps = (store) => {

    return {
        state: store.user.loginState
    };
};
// const mapDispatchToProps = (dispatch) => {
//     return {
//         submitData: (data) => dispatch(postBoard(data))
//     };
// };

export default connect(mapStateToProps)(SignIn);

