"use client";

import React, { useEffect, useRef } from "react";
import { useSpring } from 'react-spring';
import createGlobe from 'cobe';

// Define the props type if necessary, assuming none for now
interface CobeModelProps {}

export function CobeModel({}: CobeModelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Add type annotation for ref
  const pointerInteracting = useRef<number | null>(null); // Correct type for interaction state
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001
    }
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize(); // Initial size calculation

    if (!canvasRef.current) return; // Ensure canvasRef is current

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [39.9042, 116.4074], size: 0.05 } // Example marker (Beijing)
      ],
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          phi += 0.005; // Continuous rotation speed
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    // Fade in animation
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 500); // Adjust delay as needed

    // Cleanup function
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [api, r]); // Add dependencies if needed, though globe creation might only need to run once

  return (
    <div
      className={'animate-in slide-in-from-bottom ease-in duration-[3s]'} // Example animation class
      style={{
        width: '100%',
        maxWidth: 600, // Adjust as needed
        aspectRatio: '1 / 1', // Ensure square aspect ratio
        margin: 'auto',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 200 });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 100 });
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0, // Start transparent for fade-in
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
