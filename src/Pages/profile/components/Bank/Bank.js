import {useEffect, useState} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {Card , Row, Col} from 'antd'
import BankInfo from './BankInfo'
import AddBank from './AddBank'

const Bank = props => {
    return(
        <>
            <h1>Thông Tin Ngân Hàng</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <Switch>
                    <Route path="/dashboard/profile/bank/add">
                        <AddBank
                            userID={props.userID}
                            setBankData={props.setBankData}
                        />
                    </Route>
                    <Route path="/dashboard/profile/bank">
                        <BankInfo
                            bankData={props.bankData}
                            userID={props.userID}
                            setBankData={props.setBankData}
                        />
                    </Route>
                </Switch>
            </Card>
        </>
    );
}
export default Bank