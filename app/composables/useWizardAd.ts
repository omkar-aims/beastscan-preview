/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodType } from "zod";

export type WizardField<T> = {
  value: T;
  validator: ZodType<T>;
};

type WizardData<T extends Record<string, any>> = {
  [K in keyof T]: WizardField<T[K]>;
};

type WizardStepsArray = readonly WizardStep<any>[];

type WizardStateFromSteps<TSteps extends WizardStepsArray> = {
  [K in Extract<TSteps[number], { data: any }> as K["key"]]: {
    [FieldKey in keyof NonNullable<K["data"]>]: NonNullable<
      K["data"]
    >[FieldKey]["value"];
  };
};

type WizardErrorsFromSteps<TSteps extends WizardStepsArray> = {
  [K in Extract<TSteps[number], { data: any }> as K["key"]]: {
    [FieldKey in keyof NonNullable<K["data"]>]?: string;
  };
};

export type WizardStep<T extends Record<string, any> | undefined = undefined> =
  {
    key: string;
    title: string;
    description?: string;
    data?: WizardData<NonNullable<T>>;
  };

export function useWizardAd<const TSteps extends WizardStepsArray>(options: {
  storageKey: string;
  steps: TSteps;
}) {
  const { steps, storageKey } = options;
  const route = useRoute();
  const router = useRouter();

  const stepFromUrl = route.query.step as string | undefined;
  if (!stepFromUrl)
    if (typeof window !== "undefined") sessionStorage.removeItem(storageKey);

  const initialIndex =
    stepFromUrl && steps.findIndex((s) => s.key === stepFromUrl) !== -1
      ? steps.findIndex((s) => s.key === stepFromUrl)
      : 0;

  const currentStepIndex = ref(initialIndex);
  const currentStep = computed(() => steps[currentStepIndex.value]);

  type StateType = WizardStateFromSteps<TSteps>;
  type ErrorsType = WizardErrorsFromSteps<TSteps>;

  const savedState =
    typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;

  const state = ref<StateType>({} as StateType);
  const errors = ref<ErrorsType>({} as ErrorsType);
  const isAllStepCompleted = ref<boolean>(false);

  watch(isAllStepCompleted, (isCompleted) => {
    if (isCompleted && typeof window !== "undefined")
      sessionStorage.removeItem(storageKey);
  });

  steps.forEach((step) => {
    if (step.data) {
      const savedStep = savedState
        ? JSON.parse(savedState)[step.key]
        : undefined;
      const values = Object.fromEntries(
        Object.entries(step.data).map(([key, obj]) => [
          key,
          savedStep?.[key] ?? obj.value,
        ])
      );
      state.value[step.key] = values as any;
      errors.value[step.key] = {} as any;
    }
  });

  watch(
    state,
    (newState) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(storageKey, JSON.stringify(newState));
      }
    },
    { deep: true }
  );

  const validation = computed(() => {
    const step = currentStep.value;
    if (!step?.data) return { valid: true };

    const stepData = state.value[step.key];
    if (!stepData) return { valid: false };

    let valid = true;
    const stepErrors: Record<string, string> = {};

    for (const [fieldKey, field] of Object.entries(step.data)) {
      try {
        field.validator.parse(stepData[fieldKey]);
      } catch (err: any) {
        valid = false;
        stepErrors[fieldKey] = err.errors?.[0]?.message ?? "Invalid value";
      }
    }

    errors.value[step.key] = stepErrors as any;
    return valid;
  });

  function syncUrl(stepKey: string) {
    router.replace({
      query: { ...route.query, step: stepKey },
    });
  }

  function nextStep() {
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++;
      if (currentStep.value) syncUrl(currentStep.value.key);
    } else {
      isAllStepCompleted.value = true;
      if (currentStep.value) {
        router.replace(route.path);
      }
    }
  }

  function prevStep() {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--;
      if (currentStep.value) syncUrl(currentStep.value.key);
    }
  }

  watch(currentStepIndex, (newIdx) => {
    if (steps[newIdx]) syncUrl(steps[newIdx].key);
  });

  return {
    currentStepIndex,
    currentStep,
    nextStep,
    prevStep,
    canProceed: () => validation.value,
    state,
    errors,
    isAllStepCompleted,
  };
}
