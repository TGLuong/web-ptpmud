import styled from 'styled-components'


export const SigninBtn = styled.button`
    background-color:#95A5A6;
    border:none;
    border-radius:10px;
    &:focus{
        outline:none;
    }
    &:hover{
        cursor: pointer;
    }
`;

export const AddTocartButton = styled.button`
    height: 70px;
    padding: 0px 15px;
    border-radius: 18px;
    background-color: #C0392D;
    border: none;
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: #E0392D;
    }
`;



export const FacebookLoginBtn = styled.button`
    position: relative;
    cursor: pointer;
    width:100%;
    height:45px;
    margin:5px;
    color:white;
    border-radius:10px;
    font-size:18px;
    background-color:#3B5998;
    border: none;
    &:focus{
        outline:none;
    }
`;
export const GoogleLoginBtn = styled.button`
    position: relative;
    width:100%;
    height:45px;
    cursor: pointer;
    margin:5px;
    color:black;
    font-size:18px;
    background-color:#fffff;
    border: none;
    border-radius:15px;
    &:focus{
        outline:none;
    }
`;
export const CloseBtn = styled.button`
    background-color: white;
    cursor: pointer;
    border: none;
    &:focus{
        outline:none;
    }
`;
export const LoginBtn = styled.button`
    width:100%;
    cursor: pointer;
    border-radius: 10px;
    height:45px;
    font-size:18px;
    fontWeight:700;
    background-color: #00F318;
    border: none;
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: #00F358;
    }
    &:active{
        background-color: #11F358;
    }
`;

export const SearchButton = styled.button`
    background-color:#E74C3C;
    border:none;
    height:25px;
    transition:0.1s;
    width:18%;
    border-radius:0px 15px 15px 0px;
    &:focus{
        outline:none;
    }
    &:hover{
        background-color:red;
    }
    &:active{
        color:black;
        background-color:#E74C3C;
    }
`;
export const HomeButton = styled.button`
    background-color:#34495E;
    border:none;
    &:focus{
        outline:none;
    }
    &:hover{
        text-decoration: underline;
    }
`;
export const ToSigninBtn = styled.button`
    color:white;
    cursor: pointer;
    background-color: #34495E;
    border:none;
    &:focus{
        outline:none;
    }
    &:hover{
        text-decoration:underline;
        color: yellow;
    }
`;
export const ToSignupBtn = styled.button`
    margin-left: 5px;
    color:white;
    cursor: pointer;
    background-color: #34495E;
    border:none;
    &:focus{
        outline:none;
    }
    &:hover{
        text-decoration:underline;
        color: yellow;
    }
`;
export const ProfileBtn = styled.button`
    background-color:#34495E;
    color: white;
    text-transform:uppercase;
    border:none;
    outline:none;
    &:hover{
        color:yellow;
        text-decoration:underline;
    }
`;
export const DashboardCellButton = styled.button`
    border: none;
    outline: none;
    border-radius:10px;
    background-color: #95A5A6;
    &:active{
        background-color: #454546;
    }
`;
export const DeleteButton = styled.button`
    height: 32px;
    width: 70px;
    outline: none;
    border: none;
    background-color:#ef5350;
    color:white;
    border-radius: 5px;
    &:hover{
        background-color:red;
    }
    &:active{
        background-color:#ef5350;
    }
`;

export const AlterButton = styled.button`
    border:none;
    outline:none;
    background-color:#CFD8DC;
    width:100px; 
    height:30px;
    margin:0px 5px;
    border-radius:5px;
    &:hover{
        background-color:#ECEFF1;
    }
    &:active{
        background-color:#CFD8DC;
    }
`;
export const AddProductBtn = styled.button`
    background-color:#2C3E50;
    border:none;
    padding:7px 5px;
    outline:none;
    trasition:150ms;
    border-radius:5px;
    &:hover{
        background-color:#607D8B;
    }
    &:active{
        background-color:#2C3E50;
    }
`;
export const AddBankCartBtn = styled.button`
    background-color:#ee4d2d;
    outline:none;
    border:none;
    border-radius:2px;
    color:white;
    padding: 0px 20px;
    font-size:14px;
    font-weight:400;
    cursor:pointer;
    &:hover{
        background-color:#E57373;
    }
    &:active{
        background-color:#ee4d2d;
    }
`;
export const DeleteBankAccBtn = styled.button`
    border:none;
    outline:none;
    background-color:#F44336;
    padding:5px 20px;
    font-size:14px;
    font-weight:500;
    margin:0px 10px;
    color:white;
    border-radius:5px;
    &:hover{
        background-color:#E57373;
    }
    &:active{
        background-color:#F44336;
    }
`;
export const EditBankAcc = styled.button`
    border:none;
    outline:none;
    background-color:#29B6F6;
    padding:5px 20px;
    font-size:14px;
    font-weight:500;
    margin-right:10px;
    color:white;
    border-radius:5px;
    &:hover{
        background-color:#81D4FA;
    }
    &:active{
        background-color:#29B6F6;
    }
`;
export const GoBackBtn = styled.button`
    transition:150ms;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    width:30px;
    height:30px;
    outline:none;
    border:none;
    background-color:inherit;
    &:active{
        background-color:#ECEFF1;
    }
`;
export const CheckoutButton = styled.button`
    border:4px solid #607D8B;
    outline:none;
    font-size:26px;
    text-transform:uppercase;
    border-radius:3px;
    padding:10px 20px;
    font-weight:500;
    width:100%;
    color:white;
    transition:120ms;
    background-color:#607D8B;
    &:hover{
        background-color:white;
        border:4px solid #607D8B;
        color:#607D8B;
    }
    &:active{
        background-color:#CFD8DC;
    }
`;