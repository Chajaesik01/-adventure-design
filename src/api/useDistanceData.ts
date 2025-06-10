import { useState, useEffect } from 'react';
import { ref, off, onValue } from 'firebase/database';
import { database } from '../firebase-config'; 


export const useDistanceData = () => {
  const [distance, setDistance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    // exercisesData/distance 경로 참조
    const distanceRef = ref(database, 'exercisesData/distance');
    
    // 실시간 리스너 설정
    const unsubscribe = onValue(
      distanceRef,
      (snapshot:any) => {
        
        try {
          if (snapshot.exists()) {
            const distanceValue = snapshot.val() as number;
            setDistance(distanceValue);
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
      off(distanceRef, 'value', unsubscribe);
    };
  }, []);

  return { distance, isLoading, error };
};