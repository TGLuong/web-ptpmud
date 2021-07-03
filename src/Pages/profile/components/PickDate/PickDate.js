import {useEffect, useState} from 'react'
import {Row,Col,Select} from 'antd'
const {Option} = Select
const PickDate = props => {
    const [day,setDay] = useState(props.dateOfBirth[0])
    const [month,setMonth] = useState(props.dateOfBirth[1])
    const [year,setYear] = useState(props.dateOfBirth[2])
    
    const onChange = props.onChange || function(){}
    const dayRender = () => {
        let day = [];
        if(month===2){
            let maxDay = 0
            if(year%4===0&&year%100!==0){
                maxDay = 29
            } else maxDay = 28
            for(let i=1;i<=maxDay;i++){
                day.push(<Option key={i} value={i}>{i}</Option>)
            }
        }else if([1,3,5,7,8,10,12].includes(month)){
            for(let i=1;i<=31;i++){
                day.push(<Option key={i} value={i}>{i}</Option>)
            }
        }else{
            for(let i=1;i<=30;i++){
                day.push(<Option key={i} value={i}>{i}</Option>)
            }
        }
        return day
    }
    const monthRender = () => {
        let month = [];
        for(let i=1;i<=12;i++){
            month.push(<Option key={i} value={i}>{i}</Option>);
        }
        return(month)
    }
    const yearRender = () => {
        let year = []
        for(let i=new Date().getFullYear();i>=new Date().getFullYear()-50;i--){
            year.push(<Option key={i} value={i}>{i}</Option>)
        }
        return year
    }
    useEffect(()=>{
        onChange(day,month,year)
    },[day,month,year])
    return(
        <>
            <Row>
                <Col sm={5}>
                    <Select onChange={(value,option)=>{setDay(value)}} style={{width:'100px'}} value={day}>
                        {dayRender()}
                    </Select>
                </Col>
                <Col md={5}>
                    <Select 
                        onChange={(value,option)=>{
                            if(value===2&&day>28){
                                if(year%4===0&&year%100!==0&&day>29){
                                    setDay(29)
                                }else setDay(28)
                                
                            }else if ([4,6,9,11].filter(e=>e===value)&&day>30) setDay(30)
                            setMonth(value)
                        }}
                        style={{width:'100px'}} 
                        value={month}
                    >
                        {monthRender()}
                    </Select>
                </Col>
                <Col md={5}>
                    <Select 
                        style={{width:'100px'}} 
                        value={year}
                        onChange={setYear}
                    >
                        {yearRender()}
                    </Select>
                </Col>
            </Row>
            
            
        </>
    );
}
export default PickDate
