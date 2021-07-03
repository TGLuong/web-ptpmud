import {
    useState
} from'react'
import {
    Button
} from 'antd'

const DeleteButton = props => {
    const [loading,isLoading]=useState(false)
    return(
        <Button
            loading={loading}
            danger
            onClick={()=>{
                if(props.onClick)props.onClick(isLoading)
                isLoading(true)
            }}
        >
            {props.text}
        </Button>
    )
}
export default DeleteButton