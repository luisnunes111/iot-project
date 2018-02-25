import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createBoard } from '../../actions/boardActions';
import { Grid, Row, Col } from 'react-bootstrap';

import '../../styles/page-header.css'
import '../../styles/form.css'

class BoardForm extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            name: "",
            division: "",
            boardId: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit() {
        this.props.dispatch(createBoard({...this.state, username: this.props.username }))
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }

    render(){

        const { error, success, pending } = this.props.state;

        if (success) 
            return <Redirect to='/boards'/>;
        
        return(
            <div>
                <Grid className="dashboard-container" fluid={true}>     
                    <Row className="container-button-row"> 
                        <div className="form-container">
                            <div className="form-header">
                                New Board
                            </div>
                            <div className="button-group-form">
                                <label htmlFor="name">Board Model:</label>
                                <input type="text" className="" name="name" placeholder="Zolertia" onChange={this.handleInputChange}/>
                            </div>
                            <div className="button-group-form">
                                <label htmlFor="division">Home Division:</label>
                                <input type="text" className="" name="division" placeholder="Quarto" onChange={this.handleInputChange}/>
                            </div>
                            <div className="button-group-form">
                                <label htmlFor="boardId">Board Id:</label>
                                <input type="text" className="" name="boardId" placeholder="" onChange={this.handleInputChange}/>
                            </div>

                            <div className="button-submit-form">
                                <button onClick={this.handleSubmit}>Insert Board</button>
                            </div>
                        </div>         
                    </Row>
                </Grid>  
       
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    console.log(store)
    return {
        username: store.user.username,
        state: store.boards.createState
    };
};
// const mapDispatchToProps = (dispatch) => {
//     return {
//         submitData: (data) => dispatch(postBoard(data))
//     };
// };

export default connect(mapStateToProps)(BoardForm);

