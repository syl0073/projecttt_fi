import React, { useEffect, useState } from 'react';

const BirthYear = ({ open, onClose, onSelect, defaultYear = '1956' }) => {
    const [selectedYear, setSelectedYear] = useState(defaultYear);

    // defaultYear prop이 바뀔 경우 반영되도록 useEffect 사용
    useEffect(() => {
        setSelectedYear(defaultYear);
    }, [defaultYear]);

    if (!open) return null; // ❗️ 모달이 열릴 때만 렌더링

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

    return (
        <div className={`by-overlay ${open ? 'show' : 'hide'}`} onClick={onClose}>
            <div className="by-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="by-header">
                    <p>출생년도를 선택해 주세요.</p>
                    <button
                        className="by-confirm"
                        onClick={() => {
                            onSelect(selectedYear);
                            onClose();
                        }}
                    >
                        확인
                    </button>
                </div>
                <div className="by-list-wrapper">
                    <ul className="by-list">
                        {years.map((y) => (
                            <li
                                key={y}
                                className={`by-item ${selectedYear === y ? 'active' : ''}`}
                                onClick={() => setSelectedYear(y)}
                            >
                                {y}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BirthYear;
