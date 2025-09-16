import { campaigns } from "~~/server/data/campaigns";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(async (event) => {
  const manager = crudManager(campaigns, "id");

  const body = await readBody(event);
  const newCampaign = manager.create(body);

  console.log(newCampaign);

  return newCampaign;
});
