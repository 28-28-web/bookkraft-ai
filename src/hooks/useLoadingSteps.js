import { useState, useEffect, useRef } from 'react';

/**
 * Cycles through step labels while `active` is true.
 * Each step's `ms` controls how long to show it before advancing to the next.
 * The last step shows until `active` becomes false.
 *
 * @param {{ text: string, ms: number }[]} steps
 * @param {boolean} active
 * @returns {string} current step text (empty string when inactive)
 */
export function useLoadingSteps(steps, active) {
    const [idx, setIdx] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        clearTimeout(timerRef.current);
        if (!active) {
            setIdx(0);
            return;
        }
        setIdx(0);
        let current = 0;
        const advance = () => {
            current++;
            if (current < steps.length) {
                setIdx(current);
                if (current < steps.length - 1) {
                    timerRef.current = setTimeout(advance, steps[current].ms ?? 2500);
                }
            }
        };
        if (steps.length > 1) {
            timerRef.current = setTimeout(advance, steps[0].ms ?? 2000);
        }
        return () => clearTimeout(timerRef.current);
    }, [active]); // steps is always a module-level constant — stable ref

    return active ? (steps[idx]?.text ?? '') : '';
}
