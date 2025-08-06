import React, { useState, useEffect } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import VoiceInput from './VoiceInput';
import BirthYear from './BirthYear';

const PersonalInfo = ({ formData, updateFormData, nextStep }) => {
    const [name, setName] = useState(formData.name);
    const [gender, setGender] = useState(formData.gender);
    const [birthYear, setBirthYear] = useState(formData.birthYear || '');
    const [showMic, setShowMic] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { speak, stop, isSpeaking, isSupported } = useSpeech();

    useEffect(() => {
        if (isSupported) {
            speak("고객님의 정보를 입력해 주세요", { rate: 0.9, pitch: 1.1 });
        }
    }, [speak, isSupported]);

    const handleNext = () => {
        stop();
        updateFormData({ name, gender, birthYear });
        nextStep();
    };

    const speakText = (txt) => speak(txt);

    const handleVoiceResult = (txt) => {
        setName(txt);
        speak(`${txt} 라고 입력했습니다`);
    };


    return (
        <div className="step-container">
            <div className="tts-controls">
                <button className="tts-btn" onClick={() => speakText("고객님의 정보를 입력해 주세요")} disabled={isSpeaking}>🔊 안내음성</button>
                {isSpeaking && <button className="tts-stop-btn" onClick={stop}>⏹️ 정지</button>}
            </div>

            <h2 onClick={() => speakText("고객님의 정보를 입력해 주세요")}>고객님의 정보를 입력해 주세요.</h2>

            <div className="form-group">
                <label>이름</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="김은희"
                    onFocus={() => speakText("이름을 입력하세요")}
                />
                <button className="tts-btn" style={{ marginTop: 10 }} onClick={() => setShowMic(!showMic)}>
                    {showMic ? '❌ 마이크 닫기' : '🎤 이름 말하기'}
                </button>
                {showMic && <VoiceInput onResult={handleVoiceResult} />}
            </div>

            <div className="form-group">
                <label>성별</label>
                <div className="gender-buttons">
                    <button
                        className={gender === '여자' ? 'selected' : ''}
                        onClick={() => {
                            setGender('여자');
                            speakText("여자를 선택했습니다");
                        }}
                    >여자</button>

                    <button
                        className={gender === '남자' ? 'selected' : ''}
                        onClick={() => {
                            setGender('남자');
                            speakText("남자를 선택했습니다");
                        }}
                    >남자</button>
                </div>
            </div>

            <div className="form-group">
                <label>출생년도</label>
                <div className="birth-input" onClick={() => setModalOpen(true)}>
                    {birthYear ? `${birthYear}년` : '출생년도를 선택하세요'}
                    <span>▼</span>
                </div>
            </div>

            <BirthYear
                open={modalOpen}
                defaultYear={birthYear}
                onSelect={y=> setBirthYear(y)}
                onClose={()=> setModalOpen(false)}
            />


            <button
                className="next-btn"
                disabled={!name || !gender || !birthYear}
                onClick={handleNext}
                onMouseEnter={() => name && gender && birthYear && speakText("다음 단계로 이동")}
            >
                다음
            </button>
        </div>
    );
};
export default PersonalInfo;