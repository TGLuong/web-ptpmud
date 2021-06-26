import {useEffect, useState} from 'react'
import {Card , Input, Radio, Button} from 'antd'
import PickDate from '../PickDate/PickDate'

const UserInfo = props => {
    const [dateofbrith,setDateofbirth] = useState([1,1,2000])
    const [gender,setGender] = useState(null)
    const changeGender = event => {
        setGender(event.target.value)
    }
    useEffect(()=>{
        setGender(props.userData.gender)
    },[props.userData])
    return(
        <>
            <h1>Hồ Sơ Của Tôi</h1>
            <Card
                hoverable
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Tên Đăng Nhập</td>
                            <td>{props.userData.username}</td>
                        </tr>
                        <tr>
                            <td className="label">Họ Tên</td>
                            <td><Input id="ho-ten" defaultValue={props.userData.full_name}/></td>
                        </tr>
                        <tr>
                            <td className="label">Email</td>
                            <td><Input id="email" defaultValue={props.userData.email} /></td>
                        </tr>
                        <tr>
                            <td className="label">Số Điện Thoại</td>
                            <td><Input id="std" defaultValue={props.userData.phone}/></td>
                        </tr>
                        <tr>
                            <td className="label">Giới Tính</td>
                            <td>
                                <Radio.Group value={gender} onChange={changeGender}>
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={2}>Nữ</Radio>
                                    <Radio value={3}>Khác</Radio>
                                </Radio.Group>
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Ngày Sinh</td>
                            <td><PickDate onChange={(day,month,year)=>{setDateofbirth([day,month,year])}} /></td>
                        </tr>
                        <tr>
                            <td className="label"></td>
                            <td><Button type="primary" style={{width:'100px'}}>Lưu</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}
export default UserInfo