import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 토스트 메시지 유틸리티 함수들
const toastService = {
  // 성공적으로 저장 완료 토스트
  showSuccessSaveToast: () => {
    toast.success('성공적으로 저장되었어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // 성공적으로 삭제 완료 토스트
  showDeleteSaveToast: () => {
    toast.success('성공적으로 삭제되었어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // 오류 발생 토스트
  showErrorToast: () => {
    toast.error('오류가 발생했어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // 커스텀 메시지 토스트 (성공)
  showCustomSuccessToast: (message:string) => {
    toast.success(message, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  // 커스텀 메시지 토스트 (오류)
  showCustomErrorToast: (message:string) => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export default toastService;