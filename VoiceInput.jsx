import React, { useState } from 'react';

const VoiceInput = ({ onResult }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = false;
    }

    const startListening = () => {
        if (!recognition) return alert('음성 인식을 지원하지 않는 브라우저입니다.');
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            setTranscript(result);
            onResult(result);
            setIsListening(false);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return (
        <div>
            <button onClick={startListening} disabled={isListening}>
                {isListening ? '듣는 중...' : '🎤 음성 입력'}
            </button>
            <p>📝 인식 결과: {transcript}</p>
        </div>
    );
};

export default VoiceInput;
