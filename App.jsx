import React, { useState } from 'react';
import './App.css';
import PersonalInfo from './components/PersonalInfo.jsx';
import BirthYear from './components/BirthYear.jsx';
import AddressInput from './components/AddressInput.jsx';
import AddressConfirm from './components/AddressConfirm.jsx';
import FamilyInfo from './components/FamilyInfo.jsx';

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthYear: '',
        address: '',
        isOnePerson: null,
        hasDependent: null,
        isLowIncome: null
    });

    // 출생년도 모달 열림 상태
    const [birthModalOpen, setBirthModalOpen] = useState(false);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const updateFormData = (data) => {
        setFormData({ ...formData, ...data });
    };

    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <PersonalInfo
                        formData={formData}
                        updateFormData={updateFormData}
                        nextStep={nextStep}
                        openBirthModal={() => setBirthModalOpen(false)} // 모달 열기 함수 전달
                    />
                );
            case 2:
                return <AddressInput formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <AddressConfirm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <FamilyInfo formData={formData} updateFormData={updateFormData} prevStep={prevStep} />;
            default:
                return <PersonalInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} openBirthModal={() => setBirthModalOpen(false)} />;
        }
    };

    return (
        <div className="App">
            <div className="mobile-container">
                {/* 상태바, 프로그래스바 등 */}
                <div className="status-bar">
                    <span>9:41</span>
                    <div className="signal-battery">
                        <span>●●●</span>
                        <span>📶</span>
                        <span>🔋</span>
                    </div>
                </div>
                <div className="progress-bar">
                    <div className="progress" style={{width: `${(currentStep / 5) * 100}%`}}></div>
                </div>

                {renderStep()}

                {/* 출생년도 모달 */}
                <BirthYear
                    open={birthModalOpen}
                    onClose={() => setBirthModalOpen(false)}
                    onSelect={(year) => {
                        updateFormData({ birthYear: year });
                        setBirthModalOpen(false);
                    }}
                    defaultYear={formData.birthYear || '1956'}
                />
            </div>
        </div>
    );
}

export default App;
