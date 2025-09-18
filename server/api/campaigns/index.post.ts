import { campaigns } from "~~/server/data/campaigns";
import { crudManager } from "~~/server/utils/crudManager";

export default defineEventHandler(async (event) => {
  const manager = crudManager(campaigns, "id");

  const body = await readBody(event);
  const campaign = { ...body };

  if (campaign.type === "Form") {
    campaign.url = `https://bw.aimsinfosoft.com/beast-builder/?id=${
      campaigns.length + 1
    }`;
  }

  const newCampaign = manager.create(campaign);

  return newCampaign;
});
