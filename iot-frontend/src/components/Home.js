import React from 'react';
import io from "socket.io-client";
const socket = io("http://127.0.0.1:3001");

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {reads: []}

        socket.on('receive read', (payload) => this.readReceived(payload));
    }
    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {  
        socket.emit('room', {room: "room1"})
    }

    componentWillUnmount() {  
        socket.emit('leave room', {
          room: "room1"
        })
      }

    readReceived(payload) {
        const {reads} = this.state;

        const list = [...reads, payload]
        this.setState({reads: list})   
    }

    render(){
        const {reads} = this.state;
        return (
            <div>
                <p><b>Reads:</b></p>
                {reads.map((obj, i) => <p key={i}>{obj}</p>)}
            </div>
        );
    }

}    