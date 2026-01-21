"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

interface MagneticLogoProps {
  image?: string;
  gradient?: string;
  rotation?: number;
  size?: number;
  distance?: number;
  className?: string;
}

export function MagneticLogo({
  image,
  gradient,
  rotation = 12,
  size = 32,
  distance = 0.4,
  className,
}: MagneticLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Magnetic effect on desktop
  useEffect(() => {
    if (isMobile) return;

    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        if (isHovered) {
          x.set(distanceX * distance);
          y.set(distanceY * distance);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    document.addEventListener("mousemove", calculateDistance);
    return () => document.removeEventListener("mousemove", calculateDistance);
  }, [ref, isHovered, isMobile, distance, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        x: isMobile ? 0 : springX,
        y: isMobile ? 0 : springY,
        display: "inline-flex",
        verticalAlign: "middle",
      }}
    >
      <motion.div
        className="rounded-lg shadow-lg overflow-hidden"
        style={{
          width: size,
          height: size,
          background: image ? undefined : gradient,
          rotate: rotation,
        }}
        // Subtle idle floating animation on mobile
        animate={
          isMobile
            ? {
                y: [0, -3, 0],
                rotate: [rotation, rotation + 2, rotation],
              }
            : {
                scale: isHovered ? 1.1 : 1,
              }
        }
        transition={
          isMobile
            ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.2,
              }
        }
      >
        {image && (
          <Image
            src={image}
            alt=""
            quality={100}
            width={size}
            height={size}
            className="object-cover w-full h-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
