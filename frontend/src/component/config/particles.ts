
export const particles = {
    autoPlay: true,
    background: {
      color: { value: "#000000" },
      image: "",
      position: "",
      repeat: "",
      size: "",
      opacity: 1
    },
    backgroundMask: {
      composite: "destination-out",
      cover: { opacity: 1, color: { value: "" } },
      enable: false
    },
    clear: true,
    defaultThemes: {},
    delay: 0,
    fullScreen: { enable: true, zIndex: -1 },
    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: { enable: false, mode: [] },
        onDiv: { selectors: [], enable: false, mode: [], type: "circle" },
        onHover: {
          enable: false,
          mode: [],
          parallax: { enable: false, force: 2, smooth: 10 }
        },
        resize: { delay: 0.5, enable: true }
      },
      modes: {
        trail: { delay: 1, pauseOnStop: false, quantity: 1 },
        attract: {
          distance: 200,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 50,
          speed: 1
        },
        bounce: { distance: 200 },
        bubble: {
          distance: 200,
          duration: 0.4,
          mix: false,
          divs: {
            distance: 200,
            duration: 0.4,
            mix: false,
            selectors: []
          }
        },
        connect: {
          distance: 80,
          links: { opacity: 0.5 },
          radius: 60
        },
        grab: {
          distance: 100,
          links: { blink: false, consent: false, opacity: 1 }
        },
        push: { default: true, groups: [], quantity: 4 },
        remove: { quantity: 2 },
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          divs: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            selectors: []
          }
        }
      }
    },
    manualParticles: [],
    particles: {
      bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
      collisions: {
        enable: false,
        mode: "bounce",
        overlap: { enable: true, retries: 0 }
      },
      color: { value: "#fff" },
      move: {
        direction: "right",
        enable: true,
        speed: 5,
        outModes: { default: "out" }
      },
      number: {
        density: { enable: false, width: 1920, height: 1080 },
        value: 200
      },
      opacity: { value: 1 },
      shape: { type: "circle" },
      size: { value: 3 }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    zLayers: 100,
    emitters: {
      autoPlay: true,
      fill: true,
      rate: { quantity: 1, delay: 7 },
      shape: { type: "square" },
      particles: {
        shape: {
          type: "images",
          options: {
            images: {
              src: "https://particles.js.org/images/cyan_amongus.png",
              width: 500,
              height: 634
            }
          }
        },
        size: { value: 40 },
        move: {
          speed: 10,
          outModes: { default: "none", right: "destroy" },
          straight: true
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: { enable: true, speed: 10, sync: true }
        }
      },
      position: { x: -5, y: 55 }
    }
  };
  