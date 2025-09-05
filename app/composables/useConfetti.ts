import confetti from "canvas-confetti";

export function useConfetti() {
  const shoot = (options?: Partial<Parameters<typeof confetti>[0]>) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      ...options,
    });
  };

  const shootFullScreen = (times = 5, interval = 200) => {
    let count = 0;
    const timer = setInterval(() => {
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 120,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
      count++;
      if (count >= times) clearInterval(timer);
    }, interval);
  };

  return { shoot, shootFullScreen };
}
