import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollAnimation(amount = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Triggers when section reaches the threshold visibility (e.g. 25% by default)
  const shouldAnimateIn = useInView(ref, { amount, once: false });
  
  // Triggers when section is completely out of viewport (with a 100px safety margin)
  // This ensures it only resets to 'hidden' when the user CANNOT see it.
  const isCompletelyOut = !useInView(ref, { margin: "100px 0px 100px 0px", once: false });

  useEffect(() => {
    if (shouldAnimateIn) {
      controls.start("visible");
    } else if (isCompletelyOut) {
      controls.set("hidden");
    }
  }, [shouldAnimateIn, isCompletelyOut, controls]);

  return { ref, controls };
}
