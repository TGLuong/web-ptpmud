

import {Card , Row, Col} from 'antd'
import { Switch , Route} from 'react-router-dom'
import AddressInfo from './AddressInfo'
import AddAddress from './AddAddress'
import AlterAddress from './AlterAddress'

const Address = props => {
    return(
        <>
            <h1>Thông Tin Địa Chỉ</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <Switch>
                    <Route path='/dashboard/profile/address/edit'>
                        <AlterAddress
                            addressData={props.addressData}
                            setAddressData={props.setAddressData}
                            userID={props.userID}
                        />
                    </Route>
                    <Route path='/dashboard/profile/address/add'>
                        <AddAddress
                            addressData={props.addressData}
                            setAddressData={props.setAddressData}
                            userID={props.userID}
                        />
                    </Route>
                    <Route path='/dashboard/profile/address'>
                        <AddressInfo
                            addressData={props.addressData}
                            setAddressData={props.setAddressData}
                            userID={props.userID}
                        />
                    </Route>
                </Switch>
            </Card>
        </> 
    );
}
export default Address