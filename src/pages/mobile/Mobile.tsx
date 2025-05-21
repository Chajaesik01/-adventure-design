import { useEffect, useState } from 'react'
import back from './../../assets/back1.png'
import { FaCirclePlus, FaTrashCan } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { type ExerciseSet } from '../../api/api';
import useExerciseRecord from '../../api/api';
import toastService from '../../utils/toastService';
import { getTodayDateKST } from '../../utils/getTodayDateKST';
import chest from '../../assets/chest.png';
import {S} from './StyledMobile'
import { LoadingContainer, Spinner } from '../../loading/Loading';

const Mobile = () => {
  let exerciseName = '턱걸이';
  //let exerciseName = '팔굽혀펴기';
  const date = getTodayDateKST();
  let showImg = null;

  const { sets: fetchedSets, loading, saveSets, deleteSets } = useExerciseRecord(
    exerciseName,
    date
  );
  const [sets, setSets] = useState<(ExerciseSet & { id: number; setNumber: number })[]>([]);
  const [jumsu, setJumsu] = useState<number>(0);

useEffect(() => {
  if (!loading) {
    const initialized = fetchedSets.map((set: ExerciseSet, index: number) => ({
      id: index + 1,
      setNumber: index + 1,
      weight: set.weight || 0,
      reps: set.reps,
      rest: set.rest,
    }));
    setSets(initialized);
  }
}, [fetchedSets, loading]);

// 점수 실시간 측정 및 계산

useEffect(() => {

},[jumsu])

  const handleWeightChange = (id: number, newValue: number) => {
    setSets(prev =>
      prev.map(set => (set.id === id ? { ...set, weight: newValue } : set))
    );
  };

  const handleRepsChange = (id: number, newValue: number) => {
    setSets(prev =>
      prev.map(set => (set.id === id ? { ...set, reps: newValue } : set))
    );
  };

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1] || { weight: 0, reps: 0, rest: 0 };
    const newId = sets.length > 0 ? sets[sets.length - 1].id + 1 : 1;

    setSets(prev => [
      ...prev,
      {
        id: newId,
        setNumber: prev.length + 1,
        weight: lastSet.weight,
        reps: lastSet.reps,
        rest: lastSet.rest,
      },
    ]);
  };

  const handleDeleteSet = (id: number) => {
    const filtered = sets.filter(set => set.id !== id);
    setSets(
      filtered.map((set, index) => ({ ...set, setNumber: index + 1 }))
    );
    //toastService.showCustomSuccessToast('세트가 삭제 되었어요!');
  };

  const handleSave = async () => {
    try {
      await saveSets(exerciseName,sets.map(({ weight, reps, rest }) => ({ weight, reps, rest })));
      toastService.showSuccessSaveToast();
    } catch (error) {
      console.error(error);
      toastService.showErrorToast();
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteSets();
      setSets([]);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading){
    return(
      <LoadingContainer>
        <Spinner/>        
      </LoadingContainer>
    )
  }

  return (
    <S.MobileWrapper>
      <S.MobileContainer>
        <S.HeaderContainer>
          <S.ExcerName>{exerciseName}</S.ExcerName>
          <S.StyledMdOutlineCancel as={MdOutlineCancel} />
        </S.HeaderContainer>

        <S.MiddleContainer>
          <S.ImageContainer>
            <img src={exerciseName === '턱걸이' ? back : chest} alt={exerciseName === '턱걸이' ? '턱걸이' : '팔굽혀펴기'} />
          </S.ImageContainer>
          <S.DataContainer>
            평균<br/>근활성 점수
            <S.JumsuContainer>
              <span>{jumsu}</span>
              <p>점</p>
            </S.JumsuContainer>
          </S.DataContainer>
        </S.MiddleContainer>

        <S.AddExcerContainer onClick={handleAddSet}>
          <S.StyledFaCirclePlus as={FaCirclePlus} />
          <p>세트 추가</p>
        </S.AddExcerContainer>

        <S.SetWrapper>
          {sets.map(set => (
            <S.SetContainer key={set.id}>
              <S.SetNumber>{set.setNumber}세트</S.SetNumber>
              <S.WeightValue>
                <S.InputField
                  type="number"
                  value={set.weight}
                  onChange={e => handleWeightChange(set.id, parseInt(e.target.value) || 0)}
                  min="0"
                />
              </S.WeightValue>
              <S.WeightUnit>kg</S.WeightUnit>
              <S.RepValue>
                <S.InputField
                  type="number"
                  value={set.reps}
                  onChange={e => handleRepsChange(set.id, parseInt(e.target.value) || 0)}
                  min="0"
                />
              </S.RepValue>
              <S.RepUnit>회</S.RepUnit>
              <S.StyledFaTrashCan as={FaTrashCan} onClick={() => handleDeleteSet(set.id)} />
            </S.SetContainer>
          ))}
        </S.SetWrapper>

        <S.BottomButtonContainer>
          <S.DeleteButtonContainer onClick={handleDeleteAll}>초기화</S.DeleteButtonContainer>
          <S.AddButtonContainer onClick={handleSave}>저장</S.AddButtonContainer>
        </S.BottomButtonContainer>
      </S.MobileContainer>
    </S.MobileWrapper>
  );
};

export default Mobile