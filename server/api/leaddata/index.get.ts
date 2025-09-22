import { leadData } from "~~/server/data/leaddata";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(() => {
  const manager = crudManager(leadData, "id");

  return manager.read();
});
