// StyledMain.tsx
import styled from 'styled-components'

// props 타입 정의
interface MainBottomProps {
  $jumsu: number;
}

const getScoreColor = (score: number) => {
  if (score >= 70) return '#22c55e' 
  if (score >= 50) return '#f59e0b'
  return '#ef4444' 
}

export const S = {
    MainWraper: styled.div`
        display: flex;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        padding: 20px;
        gap: 6%;
    `,

    MainTitleWrapper: styled.div`
        display: flex;
        width: 100%;
        border-raidus:10px;
        border: 1pxsolid black;
        padding: 15px;
        flex-direction: row;
        gap: 10%;
    `,
    MainTitle: styled.div`
        width: 50%;
        border-radius: 10px;
        border: 1px solid black;
        padding: 15px;

        h3 {
            font-size: 28px;
            margin: 0;
        }
    `,
    MainMoveButton: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 100%;
        border-radius:10px;
        border: 1px solid black;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;

        &:hover {
            background-color: lightgray;
        }
    `,

    MainHeader: styled.div`
        width: 80%;
        height: auto;
        border-radius: 10px;
        border: 1px solid black;
        padding: 15px;
        
        span {
            font-size: 30px;
            color: orange;
            font-weight: 700;
        }
    `,
    
    MainBottom: styled.div<MainBottomProps>`
        width: 80%;
        height: auto;
        border-radius: 10px;
        border: 1px solid black;
        padding: 15px;
        gap: 0%;

        h3 {
            font-size: 30px;
            color: #3236FF;
            display: inline-block;
            margin: 0;
        }

        h4 {
            text-align: center;
            font-size: 50px;
            margin: 10px 0;
            color: ${props => getScoreColor(props.$jumsu)};
            span {
                color: black;
            }
        }

        p {
            font-size: 25px;
            margin: 10px 0;
        }
    `
}