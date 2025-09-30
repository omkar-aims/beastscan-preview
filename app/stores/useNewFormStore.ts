import { defineStore } from "pinia";
import type { NewForm } from "~/types/form";

const initialForm: NewForm = {
  goal: "",
  templateName: "",
  formName: "",
  formDescription: "",
  groupName: "",
  theme: {},

  behaviour: {
    trigger: {
      type: "delay",
      value: "5",
    },
    frequency: "always",
    schedule: {
      startDate: null,
      endDate: null,
    },
    visibility: {
      mobile: true,
      tablet: true,
      desktop: true,
    },
  },
};

export const useNewFormStore = defineStore("newForm", () => {
  const form = ref<NewForm>({ ...initialForm });

  function resetForm() {
    form.value = { ...initialForm };
  }

  return { form, resetForm };
});
