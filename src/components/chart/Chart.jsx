import "./chart.scss"
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useEffect, useState } from "react";
import axios from "axios";
const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const Chart = () => {
  const [data, setData] = useState({datasets:[]});
  useEffect(() => {
    const fetchData = async () => {
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const examSet=[]
    let presentCount=0
    let absentCount=0
    let total= 0
    let finalt=0
    let parcentagePresent =0
    let parcentageAbsent =0
       await axios.get(`http://localhost:8000/api/attendances`, ).then(function (response) {
        const res = response.data.data;
        return res;
        })
        .then(function (res) {
          labelSet.push(res.length + "  Students Attendance results ");
          for (const val of res) {
            const statusName=val.status
           // const finalTotal =( (val.total / (resCount * 100)) * 100).toFixed(2);
           if(statusName=='Present'){
            presentCount+=1
          
           }else{
            absentCount+=1
         
           }
          
           total= presentCount +   absentCount
            parcentagePresent =( (presentCount / (total * 100)) * 100).toFixed(2);
           parcentageAbsent=( ( absentCount / (total * 100)) * 100).toFixed(2);
         
          }
         const datas = [
          {
            name: 'Present',
            // uv: 590,
             pv: parcentagePresent* 100,
            amt: parcentagePresent* 100 ,
          },
            { 
              // name: "Present", value: parcentagePresent* 100 
              name: 'Absent',
              // uv: 590,
              pv: parcentageAbsent* 100,
              amt: parcentageAbsent* 100,
            },
          
          ];

       
         setData(datas)
      
          
        
        })
        .catch(function (error) {
          console.log("error", error);
        });
        
    };
    fetchData();
  }, []);
  return (
    <div className='chart'>
    <div className="title">student attendance</div>
    
    <ComposedChart width={730} height={370} data={data}>
    <XAxis dataKey="name" />

    <Tooltip />
    <Legend />
    <CartesianGrid stroke="#f5f5f5" />
    <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
    <Bar dataKey="pv" barSize={20} fill="#00264D" />
    <Line type="monotone" dataKey="uv" stroke="brown" />
  </ComposedChart>
    </div>
  )
}

export default Chart