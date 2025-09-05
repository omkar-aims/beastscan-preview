export function useWizard(maxStep: number) {
  const currentStep = ref<number>(1);

  const isFirstStep = computed(() => currentStep.value === 1);
  const isLastStep = computed(() => currentStep.value === maxStep);

  const nextStep = () => {
    if (currentStep.value < maxStep) {
      currentStep.value += 1;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value -= 1;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= maxStep) {
      currentStep.value = step;
    }
  };

  const reset = () => {
    currentStep.value = 1;
  };

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    reset,
  };
}
