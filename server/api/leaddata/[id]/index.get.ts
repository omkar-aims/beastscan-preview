import { leadData } from "~~/server/data/leaddata";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const manager = crudManager(leadData, "id");
  return manager.get(Number(id));
});
