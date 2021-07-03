import { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu , notification} from 'antd'
import {CheckOutlined, InfoOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import { Route, Link, Switch } from 'react-router-dom'


import InLoginHeader from '../../component/header/InLoginHeader'
import DashboardDisplay from './DashboardDisplay'
import DashboardProductDisplay from './DashboardProductDisplay'
import DashboardProduct from '../Product/DashboardProduct'
import Profile from '../profile/Profile'
import Checkout from '../Checkout/Checkout'

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
        full_name:'',
        is_admin: false,
        date_of_birth:'',
        phone:'',
        username: '',
        gender:null,
    })
    const history = useHistory()

    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem('userdata'))
        if(data===null){
            history.push('/')
        }else{
            setUserData(data)
            setAddressData(JSON.parse(sessionStorage.getItem('addresses')))
            setBankData(JSON.parse(sessionStorage.getItem('banks')))
            setCartData(JSON.parse(sessionStorage.getItem('carts')))
            setFavoriteData(JSON.parse(sessionStorage.getItem('favorites')))
            setHomeData(JSON.parse(sessionStorage.getItem('homeData')))
            setLaptopData(JSON.parse(sessionStorage.getItem('laptopData')))
            setCameraData(JSON.parse(sessionStorage.getItem('cameraData')))
        }
    },[]);

    const openSucc = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#f6ffed',
                border:'1px solid #b7eb8f'
            },
            icon:<CheckOutlined
                    style={{
                        backgroundColor:'#52c41a',
                        color:'white',
                        borderRadius:'50%',
                        padding:'5px',
                        fontSize:'12px' 
                    }} 
                />
            
        })
    }

    const openInfo = (message,description) => {
        notification.open({
            message:message,
            description:description,
            style:{
                backgroundColor:'#e6f7ff',
                border:'1px solid #91d5ff'
            },
            icon:<InfoOutlined  
                    style={{
                        backgroundColor:'#1890ff',
                        color:'white',
                        borderRadius:'50%',
                        padding:'5px',
                        fontSize:'12px' 
                    }}
                />
            
        })
    }

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
                sessionStorage.setItem('carts',JSON.stringify(res.data.carts))
                openSucc('Đã thêm vào giỏ hàng','')
            })
        }else{
            openInfo('Sản phẩm đã có trong giỏ hàng','vào trong giỏ hàng để tùy chỉnh số lượng')
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
                sessionStorage.setItem('favorites',JSON.stringify(res.data))
                setFavoriteData(res.data)
                openSucc('Đã thêm sản phẩm vào mục yêu thích','')
            })
        }else{
            openInfo('Sản phẩm đã có trong mục yêu thích','')
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
                    <Profile 
                        userData={userData} 
                        setUserData={setUserData}
                        bankData={bankData}
                        setBankData={setBankData}
                        addressData={addressData}
                        setAddressData={setAddressData}
                    />
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
                        isAdmin={userData.is_admin}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route>
                <Route path="/dashboard/checkout">
                    <Checkout
                        userID={userData.id}
                        cartData={cartData}
                        setCartData={setCartData}
                        addressData={addressData}
                        bankData={bankData}
                    />
                </Route>
                <Route path='/dashboard'>
                    <DashboardDisplay 
                        load_page={load_page} 
                        products={homeData.products}
                        userID={userData.id}
                        isAdmin={userData.is_admin}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                    />
                </Route> 
            </Switch>
        </>
    );
}
export default Dashboard