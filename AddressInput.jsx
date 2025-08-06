import React, { useState } from 'react';

const AddressInput = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [address, setAddress] = useState(formData.address || '');
    const [confirmed, setConfirmed] = useState(null);  // null | true | false

    const handleFindAddress = () => {
        // TODO: 카카오/다음 주소검색 API or 모달 연결
        // (현재 샘플용) 임시 주소 반환
        const result = "충청남도 홍성군";
        setAddress(result);
        setConfirmed(null);
    };

    const handleNext = () => {
        updateFormData({ address });
        nextStep();
    };

    return (
        <div className="step-container">

            {/* 뒤로가기 */}
            <button className="back-btn" onClick={prevStep}>←</button>

            <h2>거주하고 계신 주소를 입력해 주세요.</h2>

            {/* 주소 입력창 */}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="주소 검색"
                    value={address}
                    readOnly
                />
                <button onClick={handleFindAddress} className="search-btn">🔍</button>
            </div>

            {/* 선택된 주소 표시 */}
            {address && <p>{address}</p>}

            {/* 선택 주소 맞는지 체크 */}
            {address && confirmed === null && (
                <>
                    <p style={{ marginTop: '30px' }}>해당 주소가 맞나요?</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="confirm-btn" onClick={() => setConfirmed(true)}>예</button>
                        <button className="confirm-btn" onClick={() => setConfirmed(false)}>아니오</button>
                    </div>
                </>
            )}

            {/*  예/아니오 중 선택하면 다음버튼 초록색 */}
            <button
                className="next-btn"
                onClick={handleNext}
                disabled={!(address && confirmed!==null)}
            >
                다음
            </button>
        </div>
    );
};

export default AddressInput;

