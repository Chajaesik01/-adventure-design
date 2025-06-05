import { useEffect, useState } from 'react'
import back from '../../assets/back1.png'
import chest from '../../assets/chest.png'
import { FaCirclePlus, FaTrashCan, FaPlay, FaStop } from 'react-icons/fa6'
import { MdOutlineCancel } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import useExerciseRecord, { type ExerciseSet } from '../../api/api'
import toastService from '../../utils/toastService'
import { getTodayDateKST } from '../../utils/getTodayDateKST'
import { S } from './StyledMobile'
import { LoadingContainer, Spinner } from '../../loading/Loading'
import { useDistanceData } from '../../api/useDistanceData'
import soundMp3 from '../../assets/sound.mp3';
import { useMusceleData } from '../../api/useMuscleData'
import useSound from 'use-sound'

// 운동 상태 타입 정의
type ExerciseStatus = 'ready' | 'playing' | 'completed'

interface SetItem extends ExerciseSet {
  id: number
  setNumber: number
  status: ExerciseStatus
}

const Mobile = () => {
  const date = getTodayDateKST()
  const navigate = useNavigate()
  const locationState = useLocation().state as any
  const exerciseName = locationState?.exerciseName as string

  const { sets: fetchedSets, loading, saveSets, deleteSets } = useExerciseRecord(
    exerciseName,
    date,
  )

  const { distance } = useDistanceData();
  const { muscle } = useMusceleData(); 
  const [jumsu, setJumsu] = useState(0);
  const [sound] = useSound(soundMp3);

  const [sets, setSets] = useState<SetItem[]>([])
  const [prevDistance, setPrevDistance] = useState<number>(0)

  // 처음 랜더링시
  useEffect(() => {
    if (loading) return

    const initial: SetItem[] = (fetchedSets.length
      ? fetchedSets
      : [{ reps: 0, weight: 0, rest: 0 }]
    ).map((s, idx) => ({
      id: idx + 1,
      setNumber: idx + 1,
      weight: s.weight,
      reps: s.reps,
      rest: s.rest,
      status: 'ready', // 초기 상태는 ready
    }))

    setSets(initial)
  }, [loading])

  // jumsu 계산을 위한 별도 useEffect 추가
  useEffect(() => {
    if (muscle > 0 && distance > 0) {
      const newJumsu = Math.floor((muscle / distance) * 100);
      setJumsu(newJumsu);
    }
  }, [muscle, distance]);

  // ── 2) distance 값 변경 감지하여 playing 상태 세트의 reps 증가 ─────────────────
  useEffect(() => {
    // distance가 0이 아니고, 이전 값과 다를 때만 실행
    if (distance > 0 && distance !== prevDistance) {
      
      setSets(prev => {
        const playingSet = prev.find(s => s.status === 'playing')
        
        if (playingSet) {
    
          return prev.map(s =>
            s.id === playingSet.id 
              ? { ...s, reps: s.reps + 1 }
              : s
          )
        } else {
          return prev
        }
      })
      
      // 현재 distance 값을 이전 값으로 저장
      setPrevDistance(distance)
    }
  }, [distance, prevDistance])

  // ── 3) 초기 distance 값 설정 ─────────────────────────
  useEffect(() => {
    if (distance > 0 && prevDistance === 0) {
      setPrevDistance(distance)
    }
  }, [distance, prevDistance])

  const handleStartSet = (id: number) => {
    setSets(prev => 
      prev.map(s => 
        s.id === id 
          ? { ...s, status: 'playing' as ExerciseStatus }
          : s.status === 'playing' 
            ? { ...s, status: 'ready' as ExerciseStatus }
            : s
      )
    )
  }

  // 소리 재생 수정
  useEffect(() => {
    if (jumsu >= 60) {
      console.log("소리 출력");
      sound();
    }
  }, [jumsu, sound]);

  // ── 운동 완료 (Check 버튼) ─────────────────────────
  const handleCompleteSet = (id: number) => {
    setSets(prev => {
      const updated = prev.map(s =>
        s.id === id ? { ...s, status: 'completed' as ExerciseStatus } : s
      )
      
      const nextSet = updated
        .filter(s => s.status === 'ready')
        .sort((a, b) => a.id - b.id)[0]
      
      if (nextSet) {
        return updated.map(s =>
          s.id === nextSet.id ? { ...s, reps: s.reps } : s
        )
      }
      
      return updated
    })
  }

  const handleWeightChange = (id: number, value: number) =>
    setSets(prev =>
      prev.map(s => (s.id === id ? { ...s, weight: value } : s))
    )

  const handleRepsChange = (id: number, value: number) =>
    setSets(prev =>
      prev.map(s => (s.id === id ? { ...s, reps: value } : s))
    )

  const handleAddSet = () => {
    setSets(prev => {
      const last = prev[prev.length - 1]
      const newId = last ? last.id + 1 : 1
      const added: SetItem = {
        id: newId,
        setNumber: prev.length + 1,
        weight: last?.weight ?? 0,
        reps: 0,
        rest: last?.rest ?? 0,
        status: 'ready',
      }
      return [...prev, added]
    })
  }

  const handleDeleteSet = (id: number) => {
    setSets(prev => {
      const filtered = prev.filter(s => s.id !== id)
      const reindexed = filtered.map((s, idx) => ({
        ...s,
        setNumber: idx + 1,
      }))
      return reindexed
    })
  }

  const handleSave = async () => {
    try {
      await saveSets(
        exerciseName,
        sets.map(({ weight, reps, rest }) => ({ weight, reps, rest }))
      )
      toastService.showSuccessSaveToast()
      navigate('/')
    } catch (err) {
      console.error('저장 중 에러:', err)
      toastService.showErrorToast()
    }
  }

  const handleDeleteAll = async () => {
    await deleteSets()
    setSets([])
  }

  const handleBack = () => navigate('/')

  // 상태별 아이콘 렌더링 함수
  const renderStatusIcons = (set: SetItem) => {
    switch (set.status) {
      case 'ready':
        return (
          <S.StyledFaPlayIcon
            as={FaPlay}
            onClick={() => handleStartSet(set.id)}
            style={{ cursor: 'pointer', color: 'blue' }}
            title="운동 시작"
          />
        )
      case 'playing':
        return (
          <>
            <S.StyledFaStopIcon
              as={FaStop}
              onClick={() => handleCompleteSet(set.id)}
              style={{ cursor: 'pointer', color: 'orange', marginRight: 8 }}
              title="운동 중지"
            />
          </>
        )
      case 'completed':
        return (
          <S.StyledCheckIcon
            as={FaCheck}
            style={{ color: 'green' }}
            title="완료됨"
          />
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    )
  }

  return (
    <S.MobileWrapper>
      <S.MobileContainer>
        <S.HeaderContainer>
          <S.ExcerName>{exerciseName}</S.ExcerName>
          <S.StyledMdOutlineCancel as={MdOutlineCancel} onClick={handleBack} />
        </S.HeaderContainer>

        <S.MiddleContainer>
          <S.ImageContainer>
            <img
              src={exerciseName === '턱걸이' ? back : chest}
              alt={exerciseName}
            />
          </S.ImageContainer>
          <S.DataContainer>
            평균<br />
            근활성 점수
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
          {sets.map(s => (
            <S.SetContainer key={s.id} style={{
              // playing 상태인 세트를 시각적으로 강조
              backgroundColor: s.status === 'playing' ? '#e3f2fd' : 'transparent',
              border: s.status === 'playing' ? '2px solid #2196f3' : '1px solid #ccc'
            }}>
              <S.SetNumber>{s.setNumber}세트</S.SetNumber>

              <S.WeightValue>
                <S.InputField
                  type="number"
                  value={s.weight}
                  min={0}
                  onChange={e => handleWeightChange(s.id, +e.target.value)}
                />
              </S.WeightValue>
              <S.WeightUnit>kg</S.WeightUnit>

              <S.RepValue>
                <S.InputField
                  type="number"
                  value={s.reps}
                  min={0}
                  onChange={e => handleRepsChange(s.id, +e.target.value)}
                  style={{
                    // playing 상태일 때 reps 필드 강조
                    backgroundColor: s.status === 'playing' ? '#fff3e0' : 'white',
                    fontWeight: s.status === 'playing' ? 'bold' : 'normal'
                  }}
                />
              </S.RepValue>
              <S.RepUnit>회</S.RepUnit>

              {renderStatusIcons(s)}
              
              <S.StyledFaTrashCan
                as={FaTrashCan}
                onClick={() => handleDeleteSet(s.id)}
              />
            </S.SetContainer>
          ))}
        </S.SetWrapper>

        <S.BottomButtonContainer>
          <S.DeleteButtonContainer onClick={handleDeleteAll}>
            초기화
          </S.DeleteButtonContainer>
          <S.AddButtonContainer onClick={handleSave}>
            저장
          </S.AddButtonContainer>
        </S.BottomButtonContainer>
      </S.MobileContainer>
    </S.MobileWrapper>
  )
}

export default Mobile