import { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import {useHistory} from 'react-router-dom'
import { Route, Link, Switch } from 'react-router-dom'


import InLoginHeader from '../../component/header/InLoginHeader'
import DashboardDisplay from './DashboardDisplay'
import DashboardProductDisplay from './DashboardProductDisplay'
import DashboardProduct from '../Product/DashboardProduct'
import Profile from '../profile/Profile'

import {baseUrl} from '../../config'

function Dashboard(props){
    const [homeData,setHomeData] = useState({
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

    const [laptopData,setLaptopData] = useState([
        {
            brand:'',
            id:0,
            products:[
                {
                    brand:'',
                    brand_id:0,
                    id:0,
                    images:[
                        '',
                    ],
                    price:0.0,
                    productName:'',
                    productSummary:'',
                    quantity:'',
                    warranty:''
                },
            ]
        },
    ]);

    const [cameraData,setCameraData] = useState([
        {
            brand:'',
            id:0,
            products:[
                {
                    brand:'',
                    brand_id:0,
                    id:0,
                    images:[
                        '',
                    ],
                    price:0.0,
                    productName:'',
                    productSummary:'',
                    quantity:'',
                    warranty:''
                },
            ]
        },
    ]);

    const [cartData,setCartData] = useState([
        {
            amount: 0,
            id: 0,
            product: {
                image:'',
                name:'',
                price:0.0,
            },
            product_id: 0,
            total_price: 0,
            user_id: 0
        },
    ])
    const [favoriteData,setFavoriteData] = useState([
        {
            id: 0,
            product: {
                image:'',
                name:'',
                price:0.0,
            },
            product_id: 0,
            user_id: 0
        }
    ])
    const [addressData, setAddressData] = useState([
        {
            address:'',
            full_name:'',
            id:0,
            phone:'',
            user_id:0,
        }
    ])
    const [bankData, setBankData] = useState([
        {
            bank_id:0,
            bank_name:'',
            bank_number:'',
            full_name:'',
            id:0,
            user_id:0,
        },
    ])
    const [userData,setUserData] = useState({
        email:'',
        id: 0,
        is_admin: false,
        phone:'',
        username: ''
    })
    const history = useHistory()

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem('userdata'))
        if(data===null){
            history.push('/')
        }else{
            setAddressData(data.address)
            setBankData(data.bankData)
            setCartData(data.carts)
            setFavoriteData(data.favorites)
            setUserData({
                email:data.email,
                id:data.id,
                is_admin:data.is_admin,
                phone:data.phone,
                username:data.username
            })
            setHomeData(JSON.parse(sessionStorage.getItem('homeData')))
            setLaptopData(JSON.parse(sessionStorage.getItem('laptopData')))
            setCameraData(JSON.parse(sessionStorage.getItem('cameraData')))
        }
    },[]);

    const isInCart=(id)=>{
        let check = false;
        cartData.forEach(element=>{
            if(element.product_id===id)
            {
                check=true;
            }
        })
        if(check)return true;
        else return check;
    }

    const addToCart=(element)=>{
        if(!isInCart(element.id)){
            axios({
                method:'POST',
                url:baseUrl+'/user/cart/'+userData.id+'/'+element.id,
                data:{
                    amount:1
                }
            }).then(res=>{
                setCartData(res.data.carts)
                alert('Đã thêm vào giỏ hàng')
            })
        }else{
            alert('Sản phẩm đã có trong giỏ hàng, vào trong giỏ hàng để tùy chỉnh số lượng')
        }
    }

    const isInFavorites=(id)=>{
        let check = false
        favoriteData.forEach(element=>{
            if(element.product_id===id)
            {
                check=true;
            }
        })
        if(check)return true
        else return check
    }

    const addToFavorites=(element)=>{
        if(!isInFavorites(element.id)){
            axios({
                method:'POST',
                url:baseUrl+'/user/favorite/'+userData.id+'/'+element.id
            }).then(res=>{
                setFavoriteData(res.data)
                alert('Đã thêm sản phẩm vào mục yêu thích')
            })
        }else{
            alert('Sản phẩm đã có trong mục yêu thích')
        }
    }


    
    const load_page = (page,pageSize)=>{
        axios({
            method:'GET',
            url:baseUrl+'/home?page='+page
        }).then(res=>{
            setHomeData(res.data.data)
        })
    }

    const renderMenu = (data) => {
        const item = (element) => {  
            if(element.is_laptop===true){
                return(<Link to={"/dashboard/laptop?brand="+element.id} >{element.brand}</Link>);
            }else{
                return(<Link to={"/dashboard/camera?brand="+element.id} >{element.brand}</Link>);
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

    const search = () => {
        const keyword = document.getElementById('search-input').value;
        axios({
            method:'GET',
            url:baseUrl+'/home?search='+keyword
        }).then(res=>{
            history.push('/dashboard')
            setHomeData(res.data.data)
        })
    }

    const searchEnter = (e) => {
        if(e.key==='Enter'){
            const keyword = document.getElementById('search-input').value;
            axios({
                method:'GET',
                url:baseUrl+'/home?search='+keyword
            }).then(res=>{
                history.push('/dashboard')
                setHomeData(res.data.data)
            })
        }
    }

    return(
        <>
            <InLoginHeader 
                searchEnter={searchEnter} 
                search={search} 
                load_page={load_page} 
                renderMenu={renderMenu} 
                setCartData={setCartData}
                setFavoriteData={setFavoriteData}
                homeData={homeData}
                userData={userData}
                cartData={cartData}
                favoriteData={favoriteData}
            />
            <Switch>
                <Route path="/dashboard/profile">
                    <Profile/>
                </Route>
                <Route path="/dashboard/laptop">
                    <DashboardProductDisplay 
                        productData={laptopData}
                        userID={userData.id}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route>
                <Route path="/dashboard/camera">
                    <DashboardProductDisplay 
                        productData={cameraData}
                        userID={userData.id}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route>
                <Route path="/dashboard/product-detail">
                    <DashboardProduct
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route>
                <Route path='/dashboard'>
                    <DashboardDisplay 
                        load_page={load_page} 
                        products={homeData.products}
                        userID={userData.id}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route> 
            </Switch>
        </>
    );
}
export default Dashboard