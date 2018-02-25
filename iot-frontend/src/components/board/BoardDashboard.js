import React from 'react';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/boardActions';
import io from "socket.io-client";
import { Grid, Row, Col } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries} from 'react-vis';


import '../../styles/board_dashboard.css'
import '../../styles/page-header.css'

const socket = io("http://127.0.0.1:3001");

class BoardDashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            boardId: this.props.match.params.id,
            reads: [],
            lightStatus: 0,
            airStatus: 0,
            updateRate: 0,
            temperatureMin: 0,
            temperatureMax: 0,
            humidityMin: 0,
            humidityMax: 0,
            luminosityMin: 0,
            luminosityMax: 0,
            temperatureData: [], 
            luminosityData: [],
            humidityData: [],
            alerts: [],
            newLuminosity: 0,
            newTemperature: 0,
            newHumidity: 0,
            newBattery: 0,
            commands: '1&2&3&4&5&6&7&0'
        };

        socket.on('received read', (payload) => this.readReceived(payload));

        this.sendCommands = this.sendCommands.bind(this);
        this.lightButton = this.lightButton.bind(this);
        this.airButton = this.airButton.bind(this);
        this.joinCommands = this.joinCommands.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        // if (this.props.board) 
            this.props.dispatch(getBoard(this.props.username, this.state.boardId));         
        
        socket.emit('room', {room: this.state.boardId})
    }

    componentWillUnmount() {  
        socket.emit('leave room', {
          room: this.state.boardId
        })
      }

    readReceived(payload) {
        const {temperatureData, luminosityData, humidityData, alerts, parameters,temperatureMin,temperatureMax,humidityMin,humidityMax
            ,luminosityMin,luminosityMax, newLuminosity, newTemperature, newHumidity, newBattery} = this.state;

        // const list = [...reads, payload]
        const list_alerts = [...alerts];

         if(temperatureData.length !== 0){
            if(parseInt(payload.temperature) < parseInt(temperatureMin)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Temperature", icon: "nb-flame-circled", state: "Low", value: payload.temperature});
            } else if(parseInt(payload.temperature) > parseInt(temperatureMax)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Temperature", icon: "nb-flame-circled", state: "High", value: payload.temperature});

            }

            if(parseInt(payload.humidity) < parseInt(humidityMin)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Humidity", icon: "nb-snowy-circled", state: "Low", value: payload.humidity});

            } else if(parseInt(payload.humidity) > parseInt(humidityMax)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Humidity", icon: "nb-snowy-circled", state: "High", value: payload.humidity});

            }

            if(parseInt(payload.luminosity) < parseInt(luminosityMin)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Luminosity", icon: "nb-sunny-circled", state: "Low", value: payload.luminosity});

            } else if(parseInt(payload.luminosity) > parseInt(luminosityMax)){
                list_alerts.unshift({ date: new Date(payload.date).toLocaleTimeString(), type: "Luminosity", icon: "nb-sunny-circled", state: "High", value: payload.luminosity});
            
            }

            let temperature = [...temperatureData, {x: new Date(payload.date), y: parseInt(payload.temperature)}];
            let luminosity= [...luminosityData, {x: new Date(payload.date), y: parseInt(payload.luminosity)}];
            let humidity= [...humidityData, {x: new Date(payload.date), y: parseInt(payload.humidity)}];
            console.log(this.state)
            // console.log({date: payload.date, humidity: payload.humidity})
            this.setState({temperatureData: temperature, luminosityData: luminosity, humidityData: humidity, alerts: list_alerts,
                newLuminosity: payload.luminosity, newTemperature: payload.temperature, newHumidity: payload.humidity, newBattery: payload.battery}) 
         }
    }

    sendCommands(boardId, commands) {
        console.log(this.joinCommands())
        socket.emit('update_commands', {boardId: boardId, commands: this.joinCommands()})
    }

    joinCommands() {
        const {updateRate, temperatureMin, temperatureMax, humidityMin, humidityMax, luminosityMin, luminosityMax, lightStatus} = this.state;
        return updateRate+"&"+temperatureMin+"&"+temperatureMax+"&"+humidityMin+"&"+humidityMax+"&"+luminosityMin+"&"+luminosityMax+"&"+lightStatus;
    }

    componentWillReceiveProps(nextProps) {  
        const {boardId, commands, lightStatus, airStatus, updateRate, temperatureData, luminosityData, humidityData,alerts
            , temperatureMin, temperatureMax, humidityMin, humidityMax, luminosityMin, luminosityMax
            , newLuminosity, newTemperature, newHumidity, newBattery} = this.state;
        
        if(temperatureData.length === 0 && (this.props.board == null && nextProps.board != null)){
            var limited = nextProps.board.reads.slice(Math.max(nextProps.board.reads.length - 50, 1))
            let temperature= limited.map(el => ({x: new Date(el.date), y: parseInt(el.temperature)}));
            let luminosity= limited.map(el => ({x: new Date(el.date), y: parseInt(el.luminosity)}));
            let humidity= limited.map(el => ({x: new Date(el.date), y: parseInt(el.humidity)}));

            let parameters = nextProps.board.parameters;

            this.setState({temperatureData: temperature,luminosityData: luminosity,humidityData: humidity, lightState: parameters.lightStatus, updateRate: parameters.refreshRate,
                 temperatureMin: parameters.temperatureMin, temperatureMax: parameters.temperatureMax, humidityMin: parameters.humidityMin, humidityMax: parameters.humidityMax,
                  luminosityMin: parameters.luminosityMin, luminosityMax: parameters.luminosityMax });
        }
    }

    lightButton(e) {
        e.preventDefault();

        let status = this.state.lightStatus === 0? 1 : 0;
        this.setState({lightStatus: status});
    }
    

    airButton(e) {
        e.preventDefault();
        
        let status = this.state.airStatus === 0? 1 : 0;
        this.setState({airStatus: status});
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({[name]: target.value});
    }


    render(){
        const {boardId, commands, lightStatus, airStatus, updateRate, temperatureData, luminosityData, humidityData,alerts
            , temperatureMin, temperatureMax, humidityMin, humidityMax, luminosityMin, luminosityMax
            , newLuminosity, newTemperature, newHumidity, newBattery} = this.state;
        
        return(          
            <div>
                <div className="dashboard-route">Boards List <span>></span> Board  <b>{boardId}</b> </div>
                <div className="dashboard-header">

                    <div className="dashboard-title-content"> 
                        <div className="dashboard-title">Board Dashboard</div>
                        <div className="dashboard-sub-title">
                            <span>Model:</span> {this.props.board && this.props.board.name} 
                            <span> Home Divison:</span> {this.props.board && this.props.board.division} 
                        </div>
                    </div>
                    
                    <div className="dashboard-buttons"> 
                        {(this.props.board) && <button onClick={() => this.sendCommands(boardId, commands)}>Send Commands</button>}  
                    </div>
                </div>
                <Grid className="dashboard-container" fluid={true}>              
                    <Row className="container-button-row">
                        <StatusButton status={lightStatus} iconName="nb-lightbulb" title="Light" color="yellow" click={this.lightButton}/>
                        <StatusButton status={airStatus} iconName="nb-gear" title="Ventilation" color="viollet" click={this.airButton}/>
                        <RefreshStatusButton status={updateRate} iconName="nb-loop" title="Refresh Rate" color="green" click={this.handleInputChange}/>
                            
                    </Row>

                    <Row className="container-button-row">                       
                        <ValuesBox title="Recent Values" temperature={newTemperature} luminosity={newLuminosity} humidity={newHumidity} battery={newBattery}/>
                        <Box title="Temperature" valueMin={temperatureMin} valueMax={temperatureMax} 
                            nameMin="temperatureMin" nameMax="temperatureMax" change={this.handleInputChange} />
                        <Box title="Luminosity" valueMin={luminosityMin} valueMax={luminosityMax} 
                            nameMin="luminosityMin" nameMax="luminosityMax" change={this.handleInputChange} />
                        <Box title="Humidity" valueMin={humidityMin} valueMax={humidityMax} 
                            nameMin="humidityMin" nameMax="humidityMax" change={this.handleInputChange} />
                    </Row>

                    <Row className="container-button-row">
                        <Col xs={6} md={8} > 
                            <Tabs>
                                <TabList>
                                    <Tab>Temperature</Tab>
                                    <Tab>Luminosity</Tab>
                                    <Tab>Humidity</Tab>
                                </TabList>

                                <TabPanel>
                                    {(temperatureData && temperatureData.length !== 0) && <Chart  data={temperatureData}/>}
                                </TabPanel>
                                <TabPanel>
                                    {(luminosityData && luminosityData.length !== 0) && <Chart  data={luminosityData}/>}
                                </TabPanel>
                                <TabPanel>
                                    {(humidityData && humidityData.length !== 0) && <Chart  data={humidityData}/>}
                                </TabPanel>
                            </Tabs>

                        </Col>
                        <Col xs={6} md={4} > 
                            <div className="alert-details">
                                <div className="alert-details-title">Alerts</div>
                                <div className="alert-details-container">
                                    {alerts.map((alert, index) => {

                                        return <Alert date={alert.date} type={alert.type} icon={alert.icon} state={alert.state} value={alert.value}/>
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>  
                             
            </div>        
        );
    }  
}

const Chart = props => (
    <XYPlot
    width={700}
    height={300}
    // yRange={props.yRange}
    xType="time"
    yType="linear">
      <XAxis/>
      <YAxis/>
      <HorizontalGridLines />
      <LineMarkSeries animation data={props.data} />
    </XYPlot>
  )
const Box = props => {
    return (
        <Col md={3} > 
            <div className="box-container">
                <div className="box-title">{props.title}</div>
                <div className="box-content">
                    <div className="box-input">
                        <label htmlFor={props.nameMin}>Min:</label>
                        <input type="text" className="" name={props.nameMin} value={props.valueMin} onChange={(e) => props.change(e)}/>
                    </div>
                    <div className="box-input">
                        <label htmlFor={props.nameMax}>Max:</label>
                        <input type="text" className="" name={props.nameMax} value={props.valueMax} onChange={(e) => props.change(e)}/>
                    </div>
                    
                </div>
            </div>
        </Col>    
    );
}

const ValuesBox = props => {
    return (
        <Col md={3} > 
            <div className="box-container">
                <div className="box-title">{props.title}</div>
                <div className="box-content">
                    <div className="box-value">
                        <div>Temperature</div>
                        <div> <i className="nb-flame-circled"></i> <b>{props.temperature} ºC</b></div>     
                    </div>
                    <div className="box-value">
                        <div>Humidity</div>
                        <div> <i className="nb-snowy-circled"></i> <b>{props.humidity} %</b></div>     
                    </div>
                    <div className="box-value">
                        <div>Luminosity</div>
                        <div> <i className="nb-sunny-circled"></i> <b>{props.luminosity} lm</b></div>     
                    </div>
                    <div className="box-value">
                        <div>Battery</div>
                        <div> <i className="nb-power-circled"></i> <b>{props.battery} mAh</b></div>     
                    </div>
                </div>
            </div>
        </Col>    
    );
}

  const Alert = props => {
    return (
        // date: , type: "Luminosity", icon:, state: "Low", value:      
        <div className="alert-message"> 
            <i className={props.icon}></i> The <b>{props.type}</b> is <b>{props.state}</b> ({props.value}). {props.date}
        </div>
        
    );
}

const StatusButton = props => {
    const active = props.status == 0? false : true
    return (
        <Col xs={6} md={4}>
            <div className="container-button" onClick={(e) => props.click(e)}>
                <div className="button-icon-container">
                    <div className={active? `button-icon ${props.color}`: "button-icon"}>
                        <i className={props.iconName}></i>
                    </div>
                </div>
                <div className="button-details">
                    <div className={active? "button-title state-active" : "button-title"}>{props.title}</div>
                    <div className="button-status">{active? "On" : "Off"}</div>
                </div>
            </div>
        </Col>
    );
}

const RefreshStatusButton = props => {

    return (
        <Col xs={6} md={4}>
            <div className="container-button">
                <div className="button-icon-container">
                    <div className={`button-icon ${props.color}`}>
                        <i className={props.iconName}></i>
                    </div>
                </div>
                <div className="button-details">
                    <div className="button-title state-active">{props.title}</div>
                    <div className="button-status">
                        <input type="text" className="" value={props.status} name="updateRate" placeholder="" onChange={(e) => props.click(e)}/>
                    </div>
                </div>
            </div>
        </Col>
    );
}






function mapStateToProps(state) {
    return {
        board: state.boards.details,
        state: state.boards.detailsState,
        username: state.user.username  
    }
}

export default connect(mapStateToProps)(BoardDashboard);