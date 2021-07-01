import {
    Switch,
    Route
} from 'react-router-dom'
import {Card} from 'antd'
import BankInfo from './BankInfo'
import AddBank from './AddBank'
import AlterBank from './AlterBank'

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
                    <Route path="/dashboard/profile/bank/alter">
                        <AlterBank
                            userID={props.userID}
                            setBankData={props.setBankData}
                            bankData={props.bankData}
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