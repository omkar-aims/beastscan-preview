import { campaigns } from "~~/server/data/campaigns";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const manager = crudManager(campaigns, "id");
  return manager.get(Number(id));
});
