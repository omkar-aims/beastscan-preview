import { defineStore } from "pinia";

type VCardSocialLink = {
  network: string;
  value: string;
};

type VCardContact = {
  type: "email" | "telephone" | "website" | "address";
  value: string;
};

interface NewVCard {
  firstName: string;
  lastName: string;
  profile: string;
  note: string;
  orgnization: {
    name: string;
    logo: string;
    role: string;
  };
  contacts: VCardContact[];
  social: VCardSocialLink[];

  theme: object;
  templateName: string;
}

const initial: NewVCard = {
  firstName: "",
  lastName: "",
  profile: "",
  note: "",
  orgnization: {
    name: "",
    logo: "",
    role: "",
  },
  contacts: [],
  social: [],

  theme: {},
  templateName: "",
};

export const useNewVCardStore = defineStore("new-vcard", () => {
  const vcard = ref<NewVCard>({ ...initial });

  function resetVCard() {
    vcard.value = { ...initial };
  }

  function addEmptySocialLink() {
    vcard.value.social.push({ network: "facebook", value: "" });
  }

  return { vcard, resetVCard, addEmptySocialLink };
});
