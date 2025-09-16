import z from "zod";

import { nanoid } from "nanoid";

import { campaignOptions } from "~/config/campaignOptions";
import { defaultQROption } from "~/config/qrCodeTemplates";
import { useWizard } from "~/composables/useWizard";
import type { Campaign } from "~/types/campaign";

export function useCampaignWizard() {
  const config = useRuntimeConfig();

  const uniqueURL = `${config.public.host}/${nanoid(8)}`;

  const newCampaign = ref<Campaign>({
    type: "",
    name: "",
    config: {},
    qrOption: { ...defaultQROption, data: uniqueURL },
    url: uniqueURL,
  });

  const qrOptions = ref({ ...defaultQROption, data: uniqueURL });

  const { currentStep, nextStep } = useWizard(4);

  const steps = [
    {
      step: 1,
      title: "Select Type",
      description: "Choose QR type",
      icon: "lucide:layers",
    },
    {
      step: 2,
      title: "Fill Data",
      description: "Enter your details",
      icon: "lucide:edit-3",
    },
    {
      step: 3,
      title: "Customize QR",
      description: "Style and personalize",
      icon: "lucide:sparkles",
    },
    {
      step: 4,
      title: "Review",
      description: "Review your QR",
      icon: "lucide:check-circle",
    },
  ];

  const formSchema = computed(() => {
    const campaign = campaignOptions.find(
      (c) => c.title === newCampaign.value.type
    );
    return campaign?.formSchema ?? z.object({});
  });

  function handleTypeSelect(value: string) {
    newCampaign.value.type = value;
    nextStep();
  }

  function handleSubmit(formData: Record<string, string>) {
    newCampaign.value.config = formData;

    // OVERRIDE DATA IF IT'S WI-FI

    const wifiLink = `WIFI:T:${newCampaign.value.config.security || "WPA"};S:${
      newCampaign.value.config.ssid
    };P:${newCampaign.value.config.password || ""};H:${
      newCampaign.value.config.hidden ? "true" : ""
    };;`;

    if (newCampaign.value.type === "Wi-Fi") {
      newCampaign.value.url = wifiLink;
      newCampaign.value.qrOption = {
        ...newCampaign.value.qrOption,
        data: wifiLink,
      };
    }

    nextStep();
  }

  return {
    newCampaign,
    qrOptions,
    steps,
    currentStep,
    nextStep,
    formSchema,
    handleTypeSelect,
    handleSubmit,
  };
}
