# Animation & Transition Systems - Rent4uSolutions

Rent4uSolutions relies on two major animation libraries—**GSAP** and **Framer Motion**—coupled with **Lenis** to deliver a responsive, tactile user experience.

---

## 🏎 Core Engine Integration: Lenis + GSAP

Lenis supplies the custom scroll timeline, which is then fed directly into GSAP's scroll handler within [providers.tsx](file:///d:/SpaceX/۔کام/Learn%20with%20Hammad/Mustafa%20Rent/Rent4You%20New/components/providers.tsx).

```typescript
// Initialising Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease-out
  orientation: "vertical",
  smoothWheel: true,
});

// Update GSAP ScrollTrigger whenever Lenis scrolls
lenis.on("scroll", ScrollTrigger.update);

// Hook Lenis into GSAP's requestAnimationFrame ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing to prevent visual stutter on heavy screens
gsap.ticker.lagSmoothing(0);
```

---

## 🎨 Animation Configurations

### 1. Parallax Blur on Scroll (`hero.tsx`)
As the user scrolls down from the Hero fold, the overlay text moves upwards, loses opacity, and blurs to create a smooth transition:
```typescript
ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: "bottom top",
  scrub: true, // Tied directly to scroll displacement
  animation: gsap.to(textRef.current, {
    y: -100,
    opacity: 0,
    filter: "blur(10px)",
    ease: "none",
  }),
});
```

### 2. Timeline Progress Indicator (`process-workflow.tsx`)
A vertical line runs down the center of the process timeline. This line fills up with a gold background dynamically as the user scrolls through the steps:
```typescript
gsap.fromTo(
  lineRef.current,
  { scaleY: 0 },
  {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: stepsRef.current,
      start: "top 60%", // Starts when top of container reaches 60% of viewport
      end: "bottom 80%", // Ends when bottom reaches 80% of viewport
      scrub: true, // Smoothly scrubs back and forth
    },
  }
);
```

### 3. SVG Dotted Path Reveals (`deal-pack.tsx`)
Dotted connector lines between the financial analysis cards are revealed in tandem with card stagger animations:
```typescript
gsap.fromTo(
  lines,
  { scaleX: 0, opacity: 0 },
  {
    scaleX: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    transformOrigin: "left center", // Animates from left side to right side
    scrollTrigger: {
      trigger: dashRef.current,
      start: "top 75%",
    },
  }
);
```

---

## 📈 Framer Motion Transitions

Framer Motion handles localized, state-driven animations:

- **Hero Slide-show Crossfade**:
  The Hero component slides background images every 5 seconds. To achieve a seamless transition without visual cuts, `AnimatePresence` manages exit and entry states:
  ```typescript
  <AnimatePresence initial={false}>
    <motion.div
      key={currentImage}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full"
    >
      <Image ... />
    </motion.div>
  </AnimatePresence>
  ```
  This combines fade effects (`opacity`), zoom-ins (`scale: 1.05`), and zoom-outs (`scale: 0.95`) simultaneously.
