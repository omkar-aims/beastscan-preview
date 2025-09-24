<script setup lang="ts">
import { useDeleteLead } from "~/composables/leadtool/useDeleteLead";
import { useLeadTool } from "~/composables/leadtool/useLeadtool";
import type { LeadDetails } from "~/types/leadDetails";

const props = defineProps<{
  leadDeatils: LeadDetails;
}>();

const showDeleteDialog = ref<boolean>(false);

const { mutate: deleteLead, status } = useDeleteLead();
const emit = defineEmits<{ (e: 'deleted'): void }>();
const { refresh } = useLeadTool();

async function handleDelete() {
  const id = props.leadDeatils.id;
  if (id)
    return deleteLead(id, {
      async onSuccess() {
        await refresh();
        showDeleteDialog.value = false;
        emit("deleted");
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
            <span>Edit Tags</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <NuxtLink to="/dashboard/leads/lead-details" class="flex gap-2 items-center">
              <Icon name="lucide:external-link" />
              <span>Preview Lead</span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
  </div>
</template>
