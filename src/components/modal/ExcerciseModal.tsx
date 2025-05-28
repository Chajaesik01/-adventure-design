import { useEffect } from 'react';
import styled from 'styled-components';

interface ExerciseModalProps {
    isOpen: boolean;
    onClose: () => void;
    setExerciseName: (name: string) => void;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 1;
`;

const ModalContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    width: 75%;
    height: 40vh;
    margin-right: 5vw;

`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
`;

const CloseButton = styled.button`
    color: #6b7280;
    font-size: 32px;
    line-height: 1;
    background: none;
    border: none;
    cursor: pointer;
    
    &:hover {
        color: #374151;
    }
`;

const ExerciseContainer = styled.div`
    display: flex;
    height: 100%;
    gap: 16px;
`;

const ExerciseCard = styled.div<{ $bgColor: string; $hoverColor: string; $textColor: string }>`

    background-color: ${props => props.$bgColor};
    border-radius: 8px;
    padding: 24px;
    display: flex;
    width: 50%;
    height: 20vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: ${props => props.$hoverColor};
    }
`;

const ExerciseIcon = styled.div`
    font-size: 64px;
    margin-bottom: 16px;
`;

const ExerciseTitle = styled.h3<{ $textColor: string }>`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.$textColor};
`;

const ExerciseDescription = styled.p<{ $textColor: string }>`
    color: ${props => props.$textColor};
    text-align: center;
    margin-top: 8px;
`;

const ExerciseModal = ({ isOpen, onClose, setExerciseName }: ExerciseModalProps) => {


    const handleMoveExercise = (exerciseType: string): void => {
        onClose(); // 모달 닫기
        setExerciseName(exerciseType)

    };
    useEffect(() => {
        // ESC 키로 모달 닫기
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // 배경 스크롤 방지
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);



    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {/* 모달 헤더 */}
                <ModalHeader>
                    <ModalTitle>운동 선택</ModalTitle>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                
                {/* 운동 선택 영역 */}
                <ExerciseContainer>
                    {/* 왼쪽: 팔굽혀펴기 */}
                    <ExerciseCard
                        onClick={() => handleMoveExercise('팔굽혀펴기')}
                        $bgColor="#dbeafe" 
                        $hoverColor="#bfdbfe" 
                        $textColor="#1e40af"
                    >
                        <ExerciseIcon>💪</ExerciseIcon>
                        <ExerciseTitle $textColor="#1e40af">팔굽혀펴기</ExerciseTitle>
                        <ExerciseDescription $textColor="#2563eb">
                            상체 근력 강화
                        </ExerciseDescription>
                    </ExerciseCard>
                    
                    {/* 오른쪽: 턱걸이 */}
                    <ExerciseCard
                        onClick={() => handleMoveExercise('턱걸이')} 
                        $bgColor="#dcfce7" 
                        $hoverColor="#bbf7d0" 
                        $textColor="#166534"
                    >
                        <ExerciseIcon>🏋️</ExerciseIcon>
                        <ExerciseTitle $textColor="#166534">턱걸이</ExerciseTitle>
                        <ExerciseDescription $textColor="#16a34a">
                            등근육 & 팔근육 강화
                        </ExerciseDescription>
                    </ExerciseCard>
                </ExerciseContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ExerciseModal;