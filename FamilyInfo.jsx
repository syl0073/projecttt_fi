import React, { useState } from 'react';

const FamilyInfo = ({ formData, updateFormData, prevStep }) => {
    const [isOnePerson, setIsOnePerson] = useState(formData.isOnePerson);
    const [hasDependent, setHasDependent] = useState(formData.hasDependent);
    const [isLowIncome, setIsLowIncome] = useState(formData.isLowIncome);

    const handleSubmit = () => {
        updateFormData({ isOnePerson, hasDependent, isLowIncome });
        alert('정보가 성공적으로 제출되었습니다!');
    };

    return (
        <div className="step-container">
            <button className="back-btn" onClick={prevStep}>←</button>

            <h2>가족구성을 입력해 주세요.</h2>

            <div className="question-group">
                <p>1인가구 이신가요?</p>
                <div className="yes-no-buttons">
                    <button
                        className={isOnePerson === true ? 'selected' : ''}
                        onClick={() => setIsOnePerson(true)}
                    >
                        네
                    </button>
                    <button
                        className={isOnePerson === false ? 'selected' : ''}
                        onClick={() => setIsOnePerson(false)}
                    >
                        아니요
                    </button>
                </div>
            </div>

            <div className="question-group">
                <p>부양 가족이 있으신가요?</p>
                <div className="yes-no-buttons">
                    <button
                        className={hasDependent === true ? 'selected' : ''}
                        onClick={() => setHasDependent(true)}
                    >
                        네
                    </button>
                    <button
                        className={hasDependent === false ? 'selected' : ''}
                        onClick={() => setHasDependent(false)}
                    >
                        아니요
                    </button>
                </div>
            </div>

            <div className="question-group">
                <p>저소득층에 해당 하시나요?</p>
                <div className="yes-no-buttons">
                    <button
                        className={isLowIncome === true ? 'selected' : ''}
                        onClick={() => setIsLowIncome(true)}
                    >
                        네
                    </button>
                    <button
                        className={isLowIncome === false ? 'selected' : ''}
                        onClick={() => setIsLowIncome(false)}
                    >
                        아니요
                    </button>
                </div>
            </div>

            <button
                className="next-btn"
                onClick={handleSubmit}
                disabled={isOnePerson === null || hasDependent === null || isLowIncome === null}
            >
                다음
            </button>
        </div>
    );
};

export default FamilyInfo;
