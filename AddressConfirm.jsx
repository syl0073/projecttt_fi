// src/components/AddressConfirm.jsx
import React, { useState } from 'react';

const AddressConfirm = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [answer, setAnswer] = useState(null);   // 예/아니오 눌렀는지

    const handleNext = () => {
        updateFormData({ isAddressConfirmed: answer });
        nextStep();
    };

    return (
        <div className="step-container">
            <button className="back-btn" onClick={prevStep}>←</button>
            <h2>해당 주소가 맞나요?</h2>

            {/* 선택된 주소 보여주기 */}
            <div className="address-result">
                {formData.address}
            </div>

            {/* 예 / 아니오 선택 */}
            <div className="yes-no-buttons">
                <button
                    className={answer === true ? "selected" : ""}
                    onClick={() => setAnswer(true)}
                >
                    예
                </button>
                <button
                    className={answer === false ? "selected" : ""}
                    onClick={() => setAnswer(false)}
                >
                    아니오
                </button>
            </div>

            {/* next 버튼 */}
            <button
                className="next-btn"
                disabled={answer === null}
                onClick={handleNext}
            >
                다음
            </button>
        </div>
    );
};

export default AddressConfirm;


