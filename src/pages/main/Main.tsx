import {S} from './StyledMain'
import {useNavigate} from 'react-router-dom';
const Main = () => {

    const jumsu = 70;
    const navigate = useNavigate();
    const handleMoveMobile = () => {
        navigate('/mobile')
    }
  return (
    <S.MainWraper>
        <S.MainTitleWrapper>
            <S.MainTitle>
                <h3>2025년 5월 <br/>운동 요약</h3>
            </S.MainTitle>
            <S.MainMoveButton onClick = {handleMoveMobile}>
                운동하기
            </S.MainMoveButton>
        </S.MainTitleWrapper>
        <S.MainHeader>
            <p>
                👍월 <span>10회</span> 운동했어요<br/>
                🔥총 <span>506</span>분동안 불태웠어요<br/>
                🏃<span>3</span>일동안 꾸준히 운동하고 있어요<br/>
            </p>
        </S.MainHeader>
        <S.MainBottom $jumsu = {jumsu}>
            <h3>평균 근활성 점수</h3>가 <br/>
            저번 운동에 비해서 이만큼이나증가했어요!<br/>
            <p>턱걸이</p>
            <h4><span>26 → </span>{jumsu}</h4>
            <p>팔굽혀펴기</p>
            <h4><span>26 → </span>{jumsu}</h4>
        </S.MainBottom>
    </S.MainWraper>
  )
}

export default Main