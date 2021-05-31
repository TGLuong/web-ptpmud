import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import { Route, Link, Switch} from 'react-router-dom'
import HomeDisplay from './SubHome/HomeDisplay'

import Header from './header/Header'

import LaptopRender from './SubHome/LaptopRender'
import CameraRender from './SubHome/CameraRender'

import logo from '../img/core-img/logo.png'








function Home(){
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
        const page = data.products.paging.current_page;
        const res = axios.get('http://47.254.253.64:5000/home?page='+page)
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
        function item(element) {
            
            if(element.is_laptop===true){
                return(<Link to={"/laptop?brand="+element.id}>{element.brand}</Link>);
            }else{
                return(<Link to={"/camera?brand="+element.id}>{element.brand}</Link>);
            }
        }
        return(
            <Menu>
                {data.map((element,index)=>{
                    return(
                        <Menu.Item key={index}>
                            {item(element)}
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
            <Header logo={logo} searchEnter={searchEnter} search={search} load_page={load_page} renderMenu={renderMenu} data={data} />
            <Switch>
                <Route path="/laptop"><LaptopRender/></Route>
                <Route path="/camera"><CameraRender/></Route>
                <Route path='/'>
                    <HomeDisplay load_page={load_page} products={data.products}/>
                </Route>
            </Switch>
        </Fragment>
    );
}
export default Home