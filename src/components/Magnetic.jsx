import { useRef } from 'react';
export default function Magnetic({ children, className = '' }) {
    const ref = useRef(null);
    const onMove = (event) => {
        if (!ref.current || window.matchMedia('(pointer: coarse)').matches)
            return;
        const rect = ref.current.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
    };
    const reset = () => {
        if (ref.current)
            ref.current.style.transform = 'translate(0, 0)';
    };
    return <span ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</span>;
}
