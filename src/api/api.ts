import { useEffect, useState } from 'react'
import { ref, get, set } from 'firebase/database'
import { database } from '../firebase-config'
import { getTodayDateKST } from '../utils/getTodayDateKST'

// 🔷 운동 세트 타입
export interface ExerciseSet {
  weight: number
  reps: number
  rest: number
}

// 🔷 운동 기록 타입
interface ExerciseRecord {
  date: string
  sets: ExerciseSet[]
}

// 🔷 운동 항목 타입
interface ExerciseItem {
  name: string
  records: ExerciseRecord[]
}

// 🔷 훅 리턴 타입
interface UseExerciseRecordResult {
  sets: ExerciseSet[]
  loading: boolean
  setSets: React.Dispatch<React.SetStateAction<ExerciseSet[]>>
  saveSets: (name:string, newSets: ExerciseSet[]) => Promise<void>
  deleteSets: () => Promise<void>
  totalRecordCount: number
  consecutiveDays: number
}

const useExerciseRecord = (
  exerciseName: string,
  targetDate: string,
): UseExerciseRecordResult => {
  const [sets, setSets] = useState<ExerciseSet[]>([])
  const [totalRecordCount, setTotalRecordCount] = useState<number>(0)
  const [consecutiveDays, setConsecutiveDays] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  // 연속된 날짜 계산 함수
  const calculateConsecutiveDays = (exerciseList: ExerciseItem[]): number => {
    // 모든 운동 기록의 날짜를 수집하고 중복 제거
    const allDates = new Set<string>()
    
    exerciseList.forEach(exercise => {
      exercise.records?.forEach(record => {
        allDates.add(record.date)
      })
    })

    if (allDates.size === 0) return 0

    // 날짜를 정렬
    const sortedDates = Array.from(allDates).sort()
    
    let maxConsecutive = 1
    let currentConsecutive = 1
    
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i])
      const previousDate = new Date(sortedDates[i - 1])
      
      // 날짜 차이가 1일인지 확인
      const timeDiff = currentDate.getTime() - previousDate.getTime()
      const dayDiff = timeDiff / (1000 * 3600 * 24)
      
      if (dayDiff === 1) {
        currentConsecutive++
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive)
      } else {
        currentConsecutive = 1
      }
    }
    
    return maxConsecutive
  }

  // 1. 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const exercisesRef = ref(database, 'exercises')

      try {
        const snapshot = await get(exercisesRef)
        if (snapshot.exists()) {
          const data = snapshot.val() as Record<string, ExerciseItem>
          const exerciseList = Object.values(data)

          const targetExercise = exerciseList.find(ex => ex.name === exerciseName)

          // 총 운동 기록 수 계산
          const totalCount = exerciseList.reduce((total, exercise) => {
            return total + (exercise.records?.length || 0)
          }, 0)
          
          // 연속된 날짜 수 계산
          const consecutive = calculateConsecutiveDays(exerciseList)
          
          setTotalRecordCount(totalCount)
          setConsecutiveDays(consecutive)
          
          console.log('총 운동 기록 수:', totalCount)
          console.log('최대 연속 운동 일수:', consecutive)

          if (targetExercise) {
            const targetRecord = targetExercise.records?.find(r => r.date === targetDate)
            setSets(targetRecord?.sets || [])
          } else {
            setSets([])
          }
        } else {
          setSets([])
          setTotalRecordCount(0)
          setConsecutiveDays(0)
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error)
        setSets([])
        setTotalRecordCount(0)
        setConsecutiveDays(0)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [exerciseName, targetDate])

  // 2. 저장 함수
  const saveSets = async (name:string, newSets: ExerciseSet[]) => {
    const exercisesRef = ref(database, 'exercises')
    const snapshot = await get(exercisesRef)

    try {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, ExerciseItem>
        const keys = Object.keys(data)
        const exerciseList = Object.values(data)

        const exerciseIndex = exerciseList.findIndex(ex => ex.name === exerciseName)

        if (exerciseIndex !== -1) {
          const key = keys[exerciseIndex]
          const records = data[key].records || []

          const recordIndex = records.findIndex(r => r.date === targetDate)
          if (recordIndex !== -1) {
            records[recordIndex].sets = newSets
          } else {
            records.push({ date: targetDate, sets: newSets })
          }

          await set(ref(database, `exercises/${name}`), {
            ...data[key],
            records
          })
        } else {
          // 운동 항목이 없으면 새로 생성
          const newExercise: ExerciseItem = {
            name: exerciseName,
            records: [{ date: targetDate, sets: newSets }]
          }
          await set(ref(database, `exercises/${name}`), newExercise)
        }
      } else {
        // exercises 자체가 없을 경우
        const newExercise: ExerciseItem = {
          name: exerciseName,
          records: [{ date: targetDate, sets: newSets }]
        }
        const todayDate = getTodayDateKST();
        await set(ref(database, `exercises/${name}/${todayDate}`), newExercise)
      }
    } catch (error) {
      console.error("저장 실패:", error)
      throw error
    }
  }

  // 3. 삭제 함수
  const deleteSets = async () => {
    try {
      const snapshot = await get(ref(database, 'exercises'))
      if (!snapshot.exists()) return

      const data = snapshot.val() as Record<string, ExerciseItem>
      const keys = Object.keys(data)
      const exerciseList = Object.values(data)

      const exerciseIndex = exerciseList.findIndex(ex => ex.name === exerciseName)
      if (exerciseIndex === -1) return

      const key = keys[exerciseIndex]
      const records = data[key].records || []

      const newRecords = records.filter(r => r.date !== targetDate)

      await set(ref(database, `exercises/${key}/records`), newRecords)
      setSets([])
    } catch (error) {
      console.error("삭제 실패:", error)
      throw error
    }
  }

  return {
    sets,
    loading,
    setSets,
    saveSets,
    deleteSets,
    totalRecordCount,
    consecutiveDays
  }
}

export default useExerciseRecord