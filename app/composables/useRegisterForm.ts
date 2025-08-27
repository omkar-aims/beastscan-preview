// app/composables/useRegisterForm.ts
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { steps, type Step } from "~/utils/registerSteps";

export function useRegisterForm() { 
  const router = useRouter();
  const step = ref(0);
  const formData = reactive<Record<string, string>>({});
  const errorMessage = ref("");
  const dir = ref<"next" | "back">("next");

  const currentStep = computed<Step | null>(() => {
    if (step.value < 0 || step.value >= steps.length) return null;
    return steps[step.value] ?? null;
  });

  const enterClass = computed(() =>
    dir.value === "next"
      ? "animate-in fade-in slide-in-from-right-8 duration-300 ease-out"
      : "animate-in fade-in slide-in-from-left-8 duration-300 ease-out"
  );

  const leaveClass = computed(() =>
    dir.value === "next"
      ? "animate-out fade-out slide-out-to-left-8 duration-300 ease-in"
      : "animate-out fade-out slide-out-to-right-8 duration-300 ease-in"
  );

  function validateField(id: string, value: string): string | null {
    if (!value) return null;

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }

    if (id === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value)) {
        return "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
      }
    }

    return null;
  }

  function validateStep(): boolean {
    const cs = currentStep.value;
    if (!cs) return false;

    for (const field of cs.fields) {
      const value = formData[field.id] ?? "";
      if (field.required && !value) {
        errorMessage.value = `${field.label} is required.`;
        return false;
      }
      const validationError = validateField(field.id, value);
      if (validationError) {
        errorMessage.value = validationError;
        return false;
      }
    }

    errorMessage.value = "";
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    if (step.value < steps.length - 1) {
      dir.value = "next";
      step.value++;
    }
  }

  function goBack() {
    if (step.value > 0) {
      dir.value = "back";
      step.value--;
    }
    errorMessage.value = "";
  }

  function handleRegisterSubmit() {
    if (!validateStep()) return;
    console.log("Form submitted:", { ...formData });
    router.push("/login");
  }

  return {
    step,
    formData,
    errorMessage,
    currentStep,
    enterClass,
    leaveClass,
    goNext,
    goBack,
    handleRegisterSubmit,
    steps,
  };
}
