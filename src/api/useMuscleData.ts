import { useState, useEffect } from 'react';
import { ref, off, onValue } from 'firebase/database';
import { database } from '../firebase-config'; 


export const useMusceleData = () => {
  const [muscle, setMuscle] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // exercisesData/muscle 경로 참조
    const muscleRef = ref(database, 'exercisesData/muscle');
    
    // 실시간 리스너 설정
    const unsubscribe = onValue(
      muscleRef,
      (snapshot:any) => {
        
        try {
          if (snapshot.exists()) {
            const muscleValue = snapshot.val() as number;
            setMuscle(muscleValue);
            setError(null);
          } else {
            setError('데이터가 존재하지 않습니다.');
          }
        } catch (err) {
          setError('데이터를 처리하는 중 오류가 발생했습니다.');
        } finally {
          setIsLoading(false);
        }
      },
      (error:any) => {
        console.error('[Debug] Firebase 리스너 오류:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    );

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      off(muscleRef, 'value', unsubscribe);
    };
  }, []);

  return { muscle, isLoading, error };
};