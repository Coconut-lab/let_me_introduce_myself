import React, { useState, useEffect, useRef } from 'react';
import './SplitFlap.css';

const SplitFlap = ({ 
  text = "HELLO WORLD", 
  speed = 80,  // 한 문자가 flip되는 속도
}) => {
  const CHARACTERS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()';
  const [displayText, setDisplayText] = useState(Array(text.length).fill(' '));
  const [flippingIndices, setFlippingIndices] = useState(new Set());
  const animationRef = useRef(null);

  useEffect(() => {
    // 각 위치의 현재 문자 인덱스
    const currentIndices = Array(text.length).fill(0);
    // 각 위치의 목표 문자 인덱스
    const targetIndices = text.split('').map(char => {
      const upperChar = char.toUpperCase();
      const index = CHARACTERS.indexOf(upperChar);
      return index === -1 ? 0 : index;
    });

    let animationFrame = 0;

    const animate = () => {
      let allComplete = true;

      // 각 위치마다 확인
      const newDisplay = [...displayText];
      const newFlipping = new Set();

      for (let i = 0; i < text.length; i++) {
        if (currentIndices[i] < targetIndices[i]) {
          allComplete = false;
          
          // 애니메이션 속도 조절 (각 문자마다 다른 시작 시간)
          if (animationFrame >= i * 3) {
            currentIndices[i]++;
            newDisplay[i] = CHARACTERS[currentIndices[i]];
            newFlipping.add(i);
          }
        } else {
          newDisplay[i] = CHARACTERS[targetIndices[i]];
        }
      }

      setDisplayText(newDisplay);
      setFlippingIndices(newFlipping);

      if (!allComplete) {
        animationFrame++;
        animationRef.current = setTimeout(animate, speed);
      }
    };

    // 애니메이션 시작
    animationRef.current = setTimeout(animate, 500); // 0.5초 후 시작

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, speed]);

  return (
    <div className="split-flap-container">
      <div className="split-flap-display">
        {displayText.map((char, index) => (
          <div 
            key={index} 
            className={`split-flap-char ${flippingIndices.has(index) ? 'flipping' : ''}`}
          >
            <div className="flap-top">
              <span>{char}</span>
            </div>
            <div className="flap-bottom">
              <span>{char}</span>
            </div>
            <div className="flap-fold"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplitFlap;
