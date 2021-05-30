import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {Pagination, Menu } from 'antd'

import NormalDisplay from './SubHome/NormalDisplay'
import Header from './header/Header'

import logo from '../img/core-img/logo.png'








function NormalHome(){
    const [data,setData] = useState({
        camera_brands:[],
        laptop_brands:[],
        products:{
            data:[
                {
                    brand:'',
                    brand_id:0,
                    id:0,
                    images:[''],
                    price:0.0,
                    productName:'',
                    productSummary:'',
                    quantity:0,
                    warranty:'',
                },
            ],
            paging:{
                current_page:1,
                records_in_page:0,
                total_count:0,
                total_page:0,
            }
        }
    });
    
    

    useEffect(()=>{
        const res = axios.get('http://47.254.253.64:5000/home?page='+data.products.paging.current_page)
        res.then((res)=>{
            setData(res.data.data)
        });
    },[]);

    
    function load_page(page,pageSize){
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
        res.then((res)=>{
            console.log(res.data)
            setData(res.data.data)
        })
    }

    
    function renderMenu(data) {
        return(
            <Menu>
                {data.map((element,index)=>{
                    return(
                        <Menu.Item key={index}>
                            <h3>{element.brand}</h3>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }
    function search() {
        const keyword = document.getElementById('search-input').value;
        const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
        res.then((res)=>{
            console.log(res.data)
            setData(res.data.data)
        })
    }
    function searchEnter(e) {
        console.log(e.key)
        if(e.key==='Enter'){
            const keyword = document.getElementById('search-input').value;
            const res = axios.get('http://47.254.253.64:5000/home?search='+keyword)
            res.then((res)=>{
                console.log(res.data)
                setData(res.data.data)
            })
        }
    }

    return(
        <Fragment>
            <Header logo={logo} searchEnter={searchEnter} search={search} renderMenu={renderMenu} data={data} />
            <NormalDisplay products={data.products}/>
            <div style={{height:'10px'}}></div>
            <div className="panigation">
                <Pagination 
                    defaultCurrent={data.products.paging.current_page} 
                    showSizeChanger={false}
                    pageSize={20}
                    total={data.products.paging.total_count}
                    onChange={load_page}/>
            </div>    
        </Fragment>
    );
}
export default NormalHome