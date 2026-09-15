import { useEffect, useRef } from 'react';
export default function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches)
            return undefined;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let rx = x;
        let ry = y;
        let raf;
        const move = (e) => {
            x = e.clientX;
            y = e.clientY;
            if (dot.current)
                dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };
        const loop = () => {
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            if (ring.current)
                ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            raf = requestAnimationFrame(loop);
        };
        const enter = (e) => {
            if (e.target.closest('a, button, input, textarea, select, .interactive'))
                document.body.classList.add('cursor-active');
        };
        const leave = (e) => {
            if (e.target.closest('a, button, input, textarea, select, .interactive'))
                document.body.classList.remove('cursor-active');
        };
        window.addEventListener('mousemove', move, { passive: true });
        document.addEventListener('mouseover', enter);
        document.addEventListener('mouseout', leave);
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseover', enter);
            document.removeEventListener('mouseout', leave);
        };
    }, []);
    return <><span className="cursorDot" ref={dot}/><span className="cursorRing" ref={ring}/></>;
}
