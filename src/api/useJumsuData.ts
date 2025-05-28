import { useState, useEffect } from 'react';
import { ref, off, onValue } from 'firebase/database';
import { database } from '../firebase-config'; 


export const useJumsuData = () => {
  const [jumsu, setJumsu] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // 경로 변경 예정
    const jumsuRef = ref(database, 'jumsu/jumsu');
    
    const unsubscribe = onValue(
      jumsuRef,
      (snapshot:any) => {
        
        try {
          if (snapshot.exists()) {
            const jumsuValue = snapshot.val() as number;
            setJumsu(jumsuValue);
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

    return () => {
      off(jumsuRef, 'value', unsubscribe);
    };
  }, []);

  return { jumsu, isLoading, error };
};