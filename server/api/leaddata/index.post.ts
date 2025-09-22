import { leadData } from "~~/server/data/leaddata";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(async (event) => {
  const manager = crudManager(leadData, "id");

  const body = await readBody(event);
  const newCampaign = manager.create(body);

  console.log(newCampaign);

  return newCampaign;
});
