import { campaigns } from "~~/server/data/campaigns";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(() => {
  const manager = crudManager(campaigns, "id");

  return manager.read();
});
