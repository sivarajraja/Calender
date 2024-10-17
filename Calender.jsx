import { useState } from "react";
import "./Calender.css";
import right_arrow from "./images/arrow.png";
import left_arrow from "./images/back.png";

const daysOfWeek  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const months = ["January","February","March","April"
    ,"May","Jun","July","August","September","October"
    ,"November","December"];

export const Calender = () => {

    const [selectedDate,setSelectedDate] = useState(new Date());

    const daysInMonth = ()=> {

        const daysArray = [];
    
        const firstDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
        const lastDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth() + 1,0);

        for(let i=0; i<firstDay.getDay(); i++){
            daysArray.push(null);    
        }

        for(let j=1; j<=lastDay.getDate(); j++){
            daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),j));
        }

        return daysArray;
    }

    const handleChangeMonth = (event)=>{
        const newMonth = parseInt(event.target.value,10);
        setSelectedDate(new Date(selectedDate.getFullYear(),newMonth,1));
    }

    const handleChangeYear = (event)=>{
        const newYear = parseInt(event.target.value,10);
        setSelectedDate(new Date(newYear,selectedDate.getMonth(),1));
    }

    const isSameDay = (day1,day2) => {
        return day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth()
        && day1.getFullYear() === day2.getFullYear();
    }

  return (
    <div className="calender">
        <div className="header">

            <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))}}>{<img src={left_arrow} alt="img"/>}</button>

            <select value={selectedDate.getMonth()} onChange={handleChangeMonth}>
                {months.map((month,index)=>(
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>

            <select value={selectedDate.getFullYear()} onChange={handleChangeYear}>
                {Array.from({length:10},(_,i) => selectedDate.getFullYear()-5+i).map((year)=>(
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <button onClick={()=>{setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))}}>{<img src={right_arrow}/>}</button>
        </div>

        <div className="daysOfWeek">
            {
                daysOfWeek.map((day)=>(
                    <div key={day}>{day}</div>
                ))
            }
        </div>
        <div className="days">
            {
                daysInMonth().map((day,index)=>(
                    <div key={index} className={day? (isSameDay(day,new Date()))? "day current":"day" :"empty"}>{day?day.getDate():""}</div>
                ))
            }
        </div>
    </div>
  )
}
