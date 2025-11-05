import { ref, computed } from "vue"
import type { FormContext } from "vee-validate"

export const useRegistrationWizard = (form: FormContext) => {
  const currentStep = ref(1)
  const totalSteps = 5

  const stepConfig = [
    { field: "email", required: true },
    { field: "password", required: true },
    { field: "accountName", required: false },
    { field: "projectName", required: false },
    { field: "referralCode", required: false },
  ] as const

  const canProceed = computed(() => {
    const config = stepConfig[currentStep.value - 1]
    if (!config) return false 

    const fieldValue = form.values[config.field as keyof typeof form.values]

    if (config.required) {
      if (config.field === "password") {
        return fieldValue && (fieldValue as string).length >= 8
      }
      return !!fieldValue
    }

    return true
  })

  const nextStep = async () => {
    const config = stepConfig[currentStep.value - 1]
    if (!config) return 

    if (config.required) {
      const result = await form.validateField(config.field)
      if (!result.valid) return
    }

    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    currentStep,
    totalSteps,
    canProceed,
    nextStep,
    prevStep,
  }
}
