import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// 토스트 컨테이너 컴포넌트
const Toast = () => {
  return (
    <S.ToastContainer>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </S.ToastContainer>
  );
};

export default Toast;

const S = {
  ToastContainer: styled.div`
    /* 필요한 경우 여기에 추가 스타일을 적용할 수 있습니다 */
  `
};