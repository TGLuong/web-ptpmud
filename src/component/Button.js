import styled from 'styled-components'


export const SigninBtn = styled.button`
background-color:#95A5A6;
border:none;
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
`;

export const SearchButton = styled.button`
    background-color:#E74C3C;
    border:none;
    height:25px;
    width:18%;
    border-radius:0px 15px 15px 0px;
    &:focus{
        outline:none;
    }
    &:hover{
        background-color:#F74C3C;
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

