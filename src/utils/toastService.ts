import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 공통 토스트 스타일 설정
const commonToastOptions = {
  position: 'bottom-center' as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    zIndex: 1,
    marginBottom: '11vh'
  },
};

// 토스트 메시지 유틸리티 함수들
const toastService = {

  showSuccessSaveToast: () => {
    toast.success('성공적으로 저장되었어요!', commonToastOptions);
  },


  showDeleteSaveToast: () => {
    toast.success('성공적으로 삭제되었어요!', commonToastOptions);
  },


  showErrorToast: () => {
    toast.error('오류가 발생했어요!', commonToastOptions);
  },


  showCustomSuccessToast: (message: string) => {
    toast.success(message, commonToastOptions);
  },


  showCustomErrorToast: (message: string) => {
    toast.error(message, commonToastOptions);
  }
};

export default toastService;