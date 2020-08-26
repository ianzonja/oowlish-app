import React, {Component} from 'react';
import './App.css';
import './TimeInputs/timeinputs.css';
import './Total/total.css';
import './WorkItem/workitem.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Header/header.css';
import TimeInput from './TimeInputs/timesinputs';
import Total from './Total/total';
import WorkItem from './WorkItem/workitem';
import DatePicker from "react-datepicker";
import Firebase from './Firebase';
import Header from './Header/header';


class App extends Component{
  constructor(props){
    super(props);
    this.db = Firebase.database();
    this.try = [];
    this.state = {
    timeInputs: [
      { id: '1', name: 'Starting time', hours:'00', minutes:'00' },
      { id: '2', name: 'Finishing time',hours:'00', minutes:'00' },
      { id: '3', name: 'Starting lunch break', hours:'00', minutes:'00' },
      { id: '4', name: 'Finishing lunch break', hours:'00', minutes:'00' }
    ],
    totalCards: [
      {id: '1', heading: 'Total worked:', color: '#85aded', value: '0 hr 0 min'},
      {id: '2', heading: 'Number of workdays:', color: '#b00538', value: '0'},
      {id: '3', heading: 'Total lunchbreaks: ', color: '#b3b00e', value: '0 hr 0 min'}
    ],
    workItems: [],
    date: this.date
  }
  }
  date = new Date();

componentDidMount(){
  let workItems = [...this.state.workItems];
    const workItemsRef = this.db.ref("workitems");
    workItemsRef.once('value', snap =>{
      snap.forEach(child =>{
        workItems.push(child.val());
      })
      this.setState({workItems: workItems});
      this.updateCardsState(workItems);
    });
  }

  dateChangedHandler = (newDate) =>{
    this.setState({date: newDate});
  }

  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons: true});
  }

  submitHandler = () =>{
    const d = this.state.date;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = d.getFullYear();
    const selectedDate = dd + "." + mm + "." + yyyy;
    const timeInputs = [...this.state.timeInputs];
    let workItems = [...this.state.workItems];
    let dateExists = false;
    workItems.map(function(workItem){     
      if (workItem.date === selectedDate)  
        dateExists = true;  
    });
    if(dateExists)
      alert("You already made an input for this date. Please, first delete input that is already made.");
    else{
      console.log(workItems);
    let maxid = 0;
    workItems.map(function(workItem){     
      if (parseInt(workItem.id) > maxid) maxid = workItem.id;    
    });
    maxid = maxid + 1;
    const arrivingTime = timeInputs[0].hours + ":" + timeInputs[0].minutes;
    const leavingTime = timeInputs[1].hours + ":" + timeInputs[1].minutes;
    const lunchBreakStarting = timeInputs[2].hours + ":" + timeInputs[2].minutes;
    const lunchBreakFinishing = timeInputs[3].hours + ":" + timeInputs[3].minutes;
    const totalWorkedHours = this.getHoursDifference(timeInputs[0], timeInputs[1]);
    const totalWorkedMinutes = this.getMinutesDifference(timeInputs[0], timeInputs[1]);
    const totalLunchBreakHours = this.getHoursDifference(timeInputs[2], timeInputs[3]);
    const totalLunchBreakMinutes = this.getMinutesDifference(timeInputs[2], timeInputs[3]);
    const totalWorked = totalWorkedHours + " hr " + totalWorkedMinutes + " min";
    const totalLunchBreak = totalLunchBreakHours + " hr " + totalLunchBreakMinutes + " min";
    workItems.push({id: maxid, date: selectedDate, workedFrom: arrivingTime, workedTo: leavingTime, totalWorkedHours: totalWorkedHours, totalWorkedMinutes: totalWorkedMinutes, lunchBreakFrom: lunchBreakStarting, lunchBreakTo: lunchBreakFinishing, totalLunchBreakHours: totalLunchBreakHours, totalLunchBreakMinutes: totalLunchBreakMinutes, totalWorked: totalWorked, totalLunchBreak: totalLunchBreak});
    this.setState({workItems: workItems});
    console.log(workItems);
    console.log(this.state.workItems);
    this.updateCardsState(workItems);
    this.db.ref("workitems").child(maxid).set({id: maxid, date: selectedDate, workedFrom: arrivingTime, workedTo: leavingTime, totalWorkedHours: totalWorkedHours, totalWorkedMinutes: totalWorkedMinutes, lunchBreakFrom: lunchBreakStarting, lunchBreakTo: lunchBreakFinishing, totalLunchBreakHours: totalLunchBreakHours, totalLunchBreakMinutes: totalLunchBreakMinutes, totalWorked: totalWorked, totalLunchBreak: totalLunchBreak});
    }
  }

  updateCardsState = (workItems) =>{
    console.log(workItems);
    const workedHoursArray = workItems.map(function(workItem) {return workItem.totalWorkedHours;});
    const workedMinutesArray = workItems.map(function(workItem) {return workItem.totalWorkedMinutes;});
    const totalCardsWorked = this.getTotalTime(workedHoursArray, workedMinutesArray);
    const lunchBreakHours = workItems.map(function(workItem) {return workItem.totalLunchBreakHours;});
    const lunchBreakMinutes = workItems.map(function(workItem) {return workItem.totalLunchBreakMinutes;});
    const totalCardsLunchBreak = this.getTotalTime(lunchBreakHours, lunchBreakMinutes);
    let totalCards = [...this.state.totalCards];
    totalCards[0].value = totalCardsWorked;
    totalCards[1].value = workItems.length;
    totalCards[2].value = totalCardsLunchBreak;
    this.setState({totalCards:totalCards});
  }

  getTotalTime = (hoursArray, minutesArray) =>{
    let totalHours = hoursArray.reduce((a, b) => a + b, 0);
    let totalMinutes = minutesArray.reduce((a, b) => a + b, 0);
    var hours = (totalMinutes / 60);
    var rhours = Math.floor(totalMinutes / 60);
    totalHours = totalHours + rhours;
    var minutes = (hours - rhours) * 60;
    var rMinutes = Math.round(minutes);
    return totalHours + "hr " + rMinutes + "min";
  }

  getHoursDifference = (timeInput1, timeInput2) =>{
    let firstTime = new Date(2000, 0, 1, timeInput1.hours, timeInput1.minutes, 0);
    let secondTIme = new Date(2000, 0, 1, timeInput2.hours, timeInput2.minutes,0);
    if(secondTIme<firstTime){
      secondTIme.setDate(secondTIme.getDate() + 1);
    }
    var diff = secondTIme - firstTime;
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    return hh;
  }

  getMinutesDifference = (timeInput1, timeInput2) =>{
    let firstTime = new Date(2000, 0, 1, timeInput1.hours, timeInput1.minutes, 0);
    let secondTIme = new Date(2000, 0, 1, timeInput2.hours, timeInput2.minutes,0);
    if(secondTIme<firstTime){
      secondTIme.setDate(secondTIme.getDate() + 1);
    }
    var diff = secondTIme - firstTime;
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    return mm;
  }

  timeInputChangeHandler = (event, id) =>{
    const timeInputs = [...this.state.timeInputs];
    const particularInputIndex = timeInputs.findIndex(t => {
      return t.id === id;
    })
    const input = event.target.value;
    if(event.target.className.includes("hours")){
      timeInputs[particularInputIndex].hours = input;
    }
    if(event.target.className.includes("minutes")){
      timeInputs[particularInputIndex].minutes = input;
    }

    this.setState({timeInputs: timeInputs})
  }

  deleteItemHandler = (event, id) =>{
    let workItems = [...this.state.workItems];
    const workItemIndex = this.state.workItems.findIndex(w => {
      return w.id === id;
    });
    workItems.splice(workItemIndex, 1);
    this.setState({workItems: workItems});
    this.db.ref('workitems').child(id).remove();
    this.updateCardsState(workItems);
  }

  render(){

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let timeInputs = (
      <div>
        {
          this.state.timeInputs.map((input, index) => {
            return <TimeInput 
              key={input.id}
              name={input.name}
              changed={(event) => this.timeInputChangeHandler(event, input.id)}/>
          })
        }
      </div>
    )

    let cardsTotal = (
      <div>
        {
          this.state.totalCards.map((card, index) => {
            return <Total 
              key={card.id}
              heading={card.heading}
              value={card.value}
              color={card.color}/>
          })
        }
      </div>
    )

    let workItems = (
      <div>
      {
        this.state.workItems.map((item, index) => {
          return <WorkItem
            key={item.id}
            date={item.date}
            workedFrom={item.workedFrom}
            workedTo={item.workedTo}
            totalWorked={item.totalWorked}
            lunchBreakFrom={item.lunchBreakFrom}
            lunchBreakTo={item.lunchBreakTo}
            totalLunchBreak={item.totalLunchBreak}
            click={(event) => this.deleteItemHandler(event, item.id)}
            />
        })
      }
    </div>
    )

    let datePicker = (
      <div>
         <DatePicker selected={this.state.date}
                    onChange={date => this.dateChangedHandler(date)}
                    className="datepicker" />
      </div>
    )

    return (
      <div className="App">
        <Header/>
        <div className="header-img">
        <div className="datepicker-container-outer">
          <div className="datepicker-container">
            {datePicker}
          </div>
        </div>
        <div className="input-container-outer">
          <div className="input-container">
            {timeInputs}
            <button class="inputs-submit" onClick={(event) => this.submitHandler()}>Submit work</button>
          </div>
        </div>
        <div className="total-container-outer">
          <div className="total-container">{cardsTotal}</div></div>
        </div>
        <div className="work-items-container-outer">
          <div className="work-items-container"> 
            {workItems}
          </div>
        </div>
      </div>
      );
    }
  }
  export default App;
