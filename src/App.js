import './App.css';
import React, { useState, useEffect } from 'react';
import logo from "./logo.png";
import arrow from "./arrow-left-long-solid.svg";
import bars from "./bars-solid.svg";
import axios from 'axios';
function App() {
  const [data, setData] = useState([]);
  const [act, setAct] = useState();
  const [day, setday] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  const [slot, setSlot] = useState([]);
  const [slotact, setSlotact] = useState();
  const getData = () => {
    axios.get("https://mentorplus.s3.ap-south-1.amazonaws.com/config/availability.json").then((response) => {
      setData(response.data);
    });
  }
  const getSlots = (item) => {
    setSlot(item.available);
    setAct(item.date);
  }
  const setsAct = (item) => {
    setSlotact(item.hour);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className='sideBar'>
        <img src={logo} alt="not loaded" width="140px" />
        <p className='menuBlockActive'>Home</p>
        <p className='menuBlock'>Profile</p>
        <p className='menuBlock'></p>
        <p className='menuBlock'></p>
        <p className='menuBlock'></p>
      </div>
      <div className='Main'>
        <div className='Header'>
          <img src={logo} className="imgH" alt="not loaded" width="200px" />
          <img src={bars} className="barsH" alt="not Loaded" width="20px" />

        </div>
        <div className='Mainarea'>
          <img src={arrow} style={{ marginTop: '10px', cursor: "pointer" }} width="18px" alt='Not loaded' />
          <h2>Book Demo session Slot</h2>
          <div style={{ display: "flex", flexDirection: "row" }}><div style={{ width: "25px", height: "4px", backgroundColor: "rgb(35,80,143)", borderTopLeftRadius: "2px", borderBottomLeftRadius: "2px" }} /><div style={{ borderTopRightRadius: "2px", borderBottomRightRadius: "2px", width: "25px", height: "4px", backgroundColor: "rgb(219,30,70)" }}></div></div>
          <h4>Select Date</h4>
          <div className='allCardMenu'>

            {
              data.map((item, index) =>
                <div className={(act === item.date) ? "cardActive" : "card"} key={index} onClick={() => getSlots(item)}>
                  <p className='day'>{day[index % 7]}</p>
                  <p className='date'>{item.date.split("T")[0].split("-")[2]}</p>
                  <p className='month'>Feb</p>
                </div>
              )
            }
          </div>
          <h4>Select Slot</h4>
          <div className='slotMenu'>
            {
              slot ?
                slot.map((item, index) =>
                  <div onClick={() => setsAct(item)} key={index} className={(slotact === item.hour) ? 'slotActive' : "slot"}>
                    <p className='slotTime'>{item.hour}{item.min ? ":" + item.min : null} PM - {item.hour + 1}{item.min ? ":" + item.min : null} PM </p>
                  </div>
                )
                :
                null
            }

          </div>

          <button className='Button' >Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
}

export default App;
