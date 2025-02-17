import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export  function Backgroundparticles  ()  {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <div className="absolute">


        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          autoPlay: true,
          background: {
            color: { value: "#000000" }
          },
          fpsLimit: 60, // Reduce FPS limit for smoother animation
          particles: {
            move: {
              direction: "right",
              enable: true,
              speed: 1, // Lower speed to reduce particle movement
              outModes: { default: "out" }
            },
            number: {
              density: { enable: true, area: 800 }, // Enable density for balanced particles
              value: 40 // Reduce number of particles
            },
            opacity: { value: 2 }, // Slightly reduce opacity for a softer effect
            size: { value: 5 },
            shape: { type: "circle" }
          },
          emitters: {
            autoPlay: true,
            rate: { quantity: 1, delay: 10 }, // Increase delay to slow down emitter
            particles: {
              move: {
                speed: 2, // Reduce emitter particle speed
                outModes: { default: "none", right: "destroy" },
                straight: true
              },
              size: { value: 20 }, // Reduce size for more balance
              rotate: {
                value: { min: 0, max: 360 },
                animation: { enable: true, speed: 5, sync: true }
              }
            },
            position: { x: -5, y: 55 }
          }
        }}
      />
              </div>
    );
};