import { defineStore } from "pinia";
import type { NewOffer } from "~/types/offer";

const initialOffer: NewOffer = {
  offerType: "",
  offerCategory:"",
 

};

export const useNewOfferStore = defineStore("newOffer", () => {
  const offer = ref<NewOffer>({ ...initialOffer });

  function resetOffer() {
    offer.value = { ...initialOffer };
  }

  return { offer, resetOffer };
});
