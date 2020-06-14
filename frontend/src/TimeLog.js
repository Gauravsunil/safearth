import React,{Component} from 'react';
import axios from 'axios';
class TimeLog extends Component{
    constructor(props){
        super(props);
        this.state={
            user:this.props.user,
            timelog:null
        }
    }

    componentDidMount(){
        
        axios.get(`/users/timelog/${this.state.user}`)
        .then(res=>{
            if(res.data.length>0){

                console.log(res);
                this.setState({timelog:res.data});
                console.log("FECTHED TIME LOG!!!");
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className="container">
                {(()=>{
                    if(this.state.timelog!=null){
                        return(
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Task Done</th>
                                        <th>Project</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Time(hh:mm:ss)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {this.state.timelog.map((item,idx)=>{
                                         return(
                                            <tr className="success" key={idx}>
                                                <td>{item.user}</td>
                                                <td>{item.task}</td>
                                                <td>{item.project}</td>
                                                <td>{item.start}</td>
                                                <td>{item.end}</td>
                                                <td>{item.timer}</td>
                                            </tr>
                                             )
                                    })}
                                </tbody>
                            </table>
                           
                        )
                    }else{
                        return(
                            <h1>No time Log Till Now!!!</h1>
                        )
                    }
                })()}
            </div>
        )
    }
}

export default TimeLog;