import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUpUser } from '../actions/userActions';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            name: "",
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit() {
        this.props.dispatch(signUpUser(this.state))
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    render(){

        const { error, success, pending} = this.props.state;

        // if (redirect) 
        //     return <Redirect to='/boards'/>;
        
        return(
            <div>
                { (error && error.state) && 
                    <div>Error: {error.msg}</div>
                }

                { success && 
                    <Redirect to='/user/login'/>
                }
                { pending && 
                    <div>sending...</div>
                }

                <div className="page-title">Sign Up</div>
                <div className="page-content">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="" name="name" placeholder="" onChange={this.handleInputChange}/>

                    <label htmlFor="username">Username</label>
                    <input type="text" className="" name="username" placeholder="" onChange={this.handleInputChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" className="" name="password" placeholder="" onChange={this.handleInputChange}/>

                    <button onClick={this.handleSubmit}>Create</button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return {
        state: store.user.registerState
    };
};
// const mapDispatchToProps = (dispatch) => {
//     return {
//         submitData: (data) => dispatch(postBoard(data))
//     };
// };

export default connect(mapStateToProps)(SignUp);

