"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Transition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.98, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, x: -20, filter: "blur(4px)" }}
                transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] // Custom spring-like easing
                }}
                className="flex-1 flex flex-col min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
