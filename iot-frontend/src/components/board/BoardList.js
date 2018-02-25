import React from 'react';
import { connect } from 'react-redux';
import { getBoards } from '../../actions/boardActions';
import { Grid, Row, Col } from 'react-bootstrap';

import '../../styles/page-header.css'
import '../../styles/boards_list.css'

import zolertia from '../../images/zolertia.png';

class BoardList extends React.Component{
    constructor(props){
        super(props);

        this.redirectToBoard = this.redirectToBoard.bind(this);
    }

    componentDidMount() {
        if (this.props.boards && !this.props.boards.data) {
            this.props.dispatch(getBoards(this.props.username));
        }
    }

    redirectToBoard(id) {
        this.props.history.push("/board/"+id)
    }  

    render(){
        return(          
            <div>
                <div className="dashboard-header">
                    <div className="dashboard-title-content"> 
                        <div className="dashboard-title">Boards List</div>
                        <div className="dashboard-sub-title">
                            <span>Number of Boards:</span> {this.props.boards.length && this.props.boards.length} 
                        </div>
                    </div>
                </div>

                {(this.props.boards.length) && <BoardsList boards={this.props.boards} redirect={this.redirectToBoard}/>}               
            </div>        
        );
    }   
}

const BoardsList = props => {
    const boards = props.boards;
    
    return(
        <Grid className="dashboard-container" fluid={true}>     
            <Row className="container-button-row"> 
                <div>{boards.map(board => <Board board={board} {...props}/>)}</div>
            </Row>
        </Grid>  
    );
}

const Board = props => {
    const board = props.board;
    return(
        <Col md={6}> 
            <div className="board-container" onClick={() => props.redirect(board.boardId)}>
                <div className="board-header">
                    Board number {board.boardId}
                </div>
                <div className="board-info">
                    <div className="board-description">
                        <div className=""><b>Model:</b> {board.name}</div>
                        <div className=""><b>House division:</b> {board.division}</div>
                    </div>
                    <div className="board-image">
                        <img src={zolertia} />
                    </div>
                </div>
                <div className="board-read">               
                    <div className="board-read-header"><b>Last read:</b> { board.reads.length && new Date(board.reads[board.reads.length-1].date).toLocaleString()}</div>
                    <div className="board-read-group">
                        <div> <i className="nb-flame-circled"></i> {board.reads.length && board.reads[board.reads.length-1].temperature} ºC</div>
                        <div> <i className="nb-snowy-circled"></i> {board.reads.length && board.reads[board.reads.length-1].humidity} %</div>
                        <div> <i className="nb-sunny-circled"></i> {board.reads.length && board.reads[board.reads.length-1].luminosity} lm</div>
                        <div> <i className="nb-power-circled"></i> {board.reads.length && board.reads[board.reads.length-1].battery} mAh</div>
                    </div>
                </div>    
            </div>
        </Col> 
    );
}

function mapStateToProps(state) {
    return {
        boards: state.boards.data,
        state: state.boards.listState,
        username: state.user.username  
    }
}

export default connect(mapStateToProps)(BoardList);