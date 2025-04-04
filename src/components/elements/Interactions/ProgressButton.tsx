// import React, { useState, useRef } from "react";
//
// interface EveProgressButtonProps {
//   onLongPress: () => void;
//   children: React.ReactNode;
//   typeClass?: "primary" | "secondary" | "tertiary" | "ghost";
// }
//
// const EveProgressButton: React.FC<EveProgressButtonProps> = ({
//   onLongPress,
//   typeClass,
//   children,
//   ...props
// }) => {
//   const { disabled, style, className, id } = props;
//   const [progress, setProgress] = useState(0);
//   const [isPressed, setIsPressed] = useState(false);
//   const animationRef = useRef<number | null>(null);
//
//   const handleStart = () => {
//     setIsPressed(true);
//     setProgress(0);
//
//     const startTime = performance.now();
//     const duration = 3000; // 3 seconds
//
//     const animate = (currentTime: number) => {
//       const elapsed = currentTime - startTime;
//       const newProgress = Math.min((elapsed / duration) * 100, 100);
//
//       setProgress(newProgress);
//
//       if (elapsed < duration) {
//         animationRef.current = requestAnimationFrame(animate);
//       } else {
//         onLongPress();
//         setIsPressed(false);
//       }
//     };
//
//     animationRef.current = requestAnimationFrame(animate);
//   };
//
//   const handleEnd = () => {
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     setIsPressed(false);
//     setProgress(0);
//   };
//
//   return (
//     <div
//       className="relative w-48 h-12 overflow-hidden"
//       onMouseDown={handleStart}
//       onMouseUp={handleEnd}
//       onMouseLeave={handleEnd}
//       onTouchStart={handleStart}
//       onTouchEnd={handleEnd}
//     >
//       <div
//         className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-100"
//         style={{ width: `${progress}%` }}
//       />
//       <button
//         className={`Eve-Button ${typeClass} ${className} w-full h-full border rounded transition-colors ${
//           isPressed ? "bg-gray-100" : "bg-white"
//         }`}
//         style={style}
//         onClick={onClick}
//         disabled={disabled}
//         id={id}
//       >
//         {children}
//       </button>
//     </div>
//   );
// };
//
// export default EveProgressButton;
//
