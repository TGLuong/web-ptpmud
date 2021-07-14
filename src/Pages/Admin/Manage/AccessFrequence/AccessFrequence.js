import ReactECharts from 'echarts-for-react';
import {
    useEffect,
    useState
} from 'react'
import axios from 'axios'
import { baseUrl } from '../../../../config';


const AccessFrequence = props => {
    const [label, setLabel] = useState([])
    const [data, setData] = useState([])


    useEffect(()=>{
        axios({
            method:"GET",
            url:baseUrl+'/visitor'
        }).then(res=>{
            setLabel(Object.keys(res.data).reverse())
            setData(Object.values(res.data).reverse())
        })
    },[])
    return(
        <div>
            <h1 style={{fontWeight:500}}>Lưu lượng truy cập 7 ngày gần nhất</h1>
            <ReactECharts
                style={{
                    height:'470px'
                }}
                option={
                    {
                        xAxis: {
                            type: 'category',
                            data: label
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: data,
                            type: 'line',
                            smooth: true
                        }]
                    }
                }
                
            />
        </div>
    )
}
export default AccessFrequence