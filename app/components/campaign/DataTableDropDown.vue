<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import { useDeleteCampaign } from "~/composables/campaign/useDeleteCampaign";
import type { Campaign } from "~/types/campaign";

const props = defineProps<{
  campaign: Campaign;
}>();

const showDeleteDialog = ref<boolean>(false);
const showShareDialog = ref<boolean>(false);

const { mutate: deleteCampaign, status } = useDeleteCampaign();
const { refresh } = useCampaigns();

async function handleDelete() {
  const id = props.campaign.id;
  if (id)
    return deleteCampaign(id, {
      async onSuccess() {
        await refresh();
        showDeleteDialog.value = false;
      },
    });
}
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <Icon name="lucide:more-horizontal" class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="lucide:pencil" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="showShareDialog = true">
            <Icon name="lucide:share-2" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              class="flex gap-2 items-center"
              :href="campaign.url"
              target="_blank"
            >
              <Icon name="lucide:external-link" />
              <span>Preview</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NuxtLink
              class="flex gap-2 items-center"
              to="./campaigns/overview"
              as-child
            >
              <Icon name="lucide:activity" />
              <span>Analytics</span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="lucide:tag" />
          <span>Assign Label</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div class="flex gap-2 items-center">
              <Icon name="lucide:cloud-download" />
              <span>Download QR</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span>PNG</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>JPEG</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>SVG</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem @click="showDeleteDialog = true">
          <Icon name="lucide:trash" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DeleteConfirmDialog
      v-model="showDeleteDialog"
      :handler="handleDelete"
      :status="status"
    />
    <AppShareDialog
      v-model="showShareDialog"
      :link-to-copy="campaign.url || ''"
    />
  </div>
</template>
