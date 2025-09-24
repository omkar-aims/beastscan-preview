import { fonts } from "../../data/fonts";

export default defineEventHandler(() => {
  return {
    status: "success",
    fonts,
  };
});
