  <script setup lang="ts">
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { Campaign } from "~/types/campaign";

  import { useCampaigns } from "~/composables/campaign/useCampaigns";
  import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
  import QRCodeCanvas from "~/components/QRCodeCanvas.vue";
  import { CampaignDataTableDropDown } from "#components";
  import Badge from "~/components/ui/badge/Badge.vue";
  const { data: campaigns } = await useCampaigns();

  const showDeleteDialog = ref<boolean>(false);

  const columns: ColumnDef<Campaign>[] = [
    {
      id: "select",
      header: ({ table }) =>
        h(Checkbox, {
          modelValue: table.getIsAllPageRowsSelected(),
          "onUpdate:modelValue": (value: boolean | string) =>
            table.toggleAllPageRowsSelected(Boolean(value)),
          ariaLabel: "Select all",
        }),
      cell: ({ row }) =>
        h(Checkbox, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value: boolean | string) =>
            row.toggleSelected(Boolean(value)),
          ariaLabel: "Select row",
        }),
      enableSorting: false,
      enableHiding: false,
    },

    {
      header: "QR Code",
      accessorKey: "qrOption",
      cell: ({ row }) => {
        const qrOption = row.getValue("qrOption");
        const options =
          typeof qrOption === "object" && qrOption !== null
            ? { ...qrOption, width: 80, height: 80 }
            : { width: 80, height: 80 };
        
        return h(QRCodeCanvas, { options });
      },
    },

    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Type",

      accessorKey: "type",
      cell: ({ row }) => h("span", { class: "uppercase" }, row.getValue("type")),
    },
    {
      header: "Mode",
      cell: () => h(Badge, { variant: "outline" }, () => "STATIC"),
    },

    {
      header: "Scans",
      cell: () => 12,
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        h(
          "span",
          Intl.DateTimeFormat("en-us").format(new Date(row.getValue("createdAt")))
        ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const campaign = row.original;

        return h(
          "div",
          { class: "relative" },
          h(CampaignDataTableDropDown, {
            campaign,
            onTriggerDeleteDialog: () => (showDeleteDialog.value = true),
          })
        );
      },
    },
  ];
  </script>

  <template>
    <div class="space-y-4">
      <template v-if="campaigns?.length === 0">
        <div class="text-center space-y-4">
          <NuxtImg
            src="/empty.svg"
            width="320"
            height="100%"
            class="m-0 mx-auto"
          />
          <div>
            <AppHeading :level="2">You don't have any QR Codes yet</AppHeading>
            <p class="text-muted-foreground mt-1">
              Start creating campaigns to reach your audience and track their
              engagement.
            </p>
          </div>
          <NuxtLink to="./qr-codes/new">
            <Button>Create New QR Code</Button>
          </NuxtLink>
        </div>
      </template>
      <template v-if="campaigns && campaigns?.length > 0">
        <AppRow>
          <AppHeading :level="3">Your Campaigns</AppHeading>
          <DataTable
            :data="campaigns"
            :columns="columns"
            :allow-import-export="false"
          />
        </AppRow>
      </template>
    </div>
  </template>
