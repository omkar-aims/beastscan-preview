export function useWizard(maxStep: number) {
  const route = useRoute();
  const router = useRouter();
  const getInitialStep = () => {
    const step = Number(route.query.step);
    return isNaN(step) ? 1 : step;
  };

  const currentStep = ref<number>(getInitialStep());

  watch(
    () => route.query.step,
    (step) => {
      const current = Number(step);
      const nextStep = current;

      if (nextStep <= maxStep) {
        currentStep.value = nextStep;
      }
    }
  );

  watch(
    () => currentStep.value,
    (value) => {
      if (value < maxStep) {
        router.push({ path: route.path, query: { step: value.toString() } });
      } else {
        router.replace({ path: route.path });
      }
    }
  );
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
    maxStep,
  };
}
