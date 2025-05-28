import styled  from 'styled-components'
import { FaCirclePlus, FaTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { FaPlay, FaStop } from "react-icons/fa";

export const S = {
    MobileWrapper: styled.div`
        display: flex;
        width: 100%;
        height: 100vh;
        justify-content: center; 
        align-items: center;
        overflow: hidden;
    `,
    MobileContainer: styled.div`
        width: 100%;
        height: 100%; 
        background-color: #F2F2F7;
        position: relative;
        padding: 60px 0 100px 0; 
        overflow-y: auto; 
    `,
    HeaderContainer: styled.div`
        display: flex;
        width: 90%;
        height: auto;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
        margin-top: 1vh;
        background-color: #F2F2F7;
    `,
    ExcerName: styled.div`
        width: auto;
        height: auto;
        margin: 2vh 0vw;
        font-size: 30px;
        font-weight: 700;
    `,
    MiddleContainer: styled.div`
        display: flex;
        flex-direction: row;
        width: 80%;
        height: 35%;
        background-color: #fff;
        padding: 20px 5%;
        margin: 0 auto 5vh auto;
    `,
    ImageContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        img {
          width: 100%;
          height: 70%;
        }
    `,
    DataContainer: styled.div`
        display: flex;
        width: 50%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        font-size: 24px;
        font-weight: 700;
    `,
    JumsuContainer: styled.div`
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        
        span {
          color: #3BD457;
          font-size: 50px;
        }
        p {
          margin-left: 1vw;
          font-size: 28px;
        }
    `,

    AddExcerContainer: styled.div`
        display: flex;
        flex-direction: row;
        width: 90%;
        height: 5%;
        font-weight: 700;
        justify-content: left;
        align-items: center;
        border-bottom: 1px solid black;
        padding: 0 5%;
        margin: 0 auto;
        gap: 2vw;
        p { 
          font-size: 24px;
          cursor: pointer;
        }

        &:hover {
          background-color: #fff;
        }
    `,

    SetWrapper: styled.div`
      width: 90%;
      min-height: 25vh;
      padding: 0 5%;
      margin: 20px auto;
      flex-grow: 1;
    `,
    
    SetContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 60px;
      margin: 10px auto;
      padding: 0 15px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `,
    
    SetNumber: styled.div`
      font-weight: 700;
      font-size: 18px;
      width: 20%;
      text-align: center;
    `,
    
    WeightValue: styled.div`
      width: 15%;
      text-align: center;
    `,
    
    WeightUnit: styled.div`
      font-size: 16px;
      width: 15%;
      text-align: center;
      color: #666;
    `,
    
    RepValue: styled.div`
      width: 15%;
      text-align: center;
    `,
    
    RepUnit: styled.div`
      font-size: 16px;
      width: 15%;
      text-align: center;
      color: #666;
    `,

    InputField: styled.input`
      width: 90%;
      height: 36px;
      padding: 5px;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: #333;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
      &:focus {
        outline: none;
        border-color: #3BD457;
        box-shadow: 0 0 3px rgba(59, 212, 87, 0.5);
      }
      &::-webkit-inner-spin-button, 
      &::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0;
      }
    `,
BottomButtonContainer: styled.div`
    display: flex;
    width: 90%;
    height: 70px;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
    gap: 5vw;
    padding: 0 5%;
    margin: 0 auto;
    background-color: transparent;
`,
    DeleteButtonContainer: styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 80%;
      color: #F41414;
      border-radius:10px;
      background-color: #F9BCBC;
      cursor: pointer;
    `,

    AddButtonContainer: styled.div`
      display: flex;
      width: 40%;
      height: 80%;
      justify-content: center;
      align-items: center;
      border-radius:10px;
      background-color: #DAFFB4;
      color: #006107;
      cursor: pointer;
    
    `,
    StyledMdOutlineCancel: styled(MdOutlineCancel)`
      font-size: 39px;
      cursor: pointer;
    `,
    StyledFaTrashCan: styled(FaTrashCan)`
      font-size: 24px;
      cursor: pointer;
      color: #F41414;
      width: 20%;
      text-align: center;
    `,
    StyledFaCirclePlus: styled(FaCirclePlus)`
      font-size: 24px;
      cursor: pointer;
    `,
    StyledCheckIcon: styled(FaCheck)`
      font-size: 24px;
      cursor: pointer;
    `,

    StyledFaPlayIcon: styled(FaPlay)`
      font-size: 24px;
      cursor: pointer;
    
    `,

    StyledFaStopIcon: styled(FaStop)`
      font-size: 24px;
      cursor: pointer;
    
    `
}