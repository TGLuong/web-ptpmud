
import {
    Card
} from 'antd'
import {

} from '@ant-design/icons'



const Password = props => {
    return(
        <>
            <h1>Đổi Mật Khẩu</h1>
            <Card
                hoverable
                style={{
                    cursor:'context-menu'
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Nhập mật khẩu</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="label">Mật khẩu mới</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="label">Nhập lại mật khẩu</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}
export default Password