<script setup lang="ts">
import type { Campaign } from "~/types";
import {
  Calendar,
  ArrowRight,
  ExternalLink,
  Archive,
  Trash,
  MoreHorizontal,
  Wrench,
  Edit,
  Share,
  TrendingUp,
  Eye,
  Scan,
} from "lucide-vue-next";
import { useDeleteCampaign } from "~/composables/campaign/useDeleteCampaign";
import { nanoid } from "nanoid";
defineProps<{
  campaigns: Campaign[];
}>();

const showCreateModal = ref<boolean>(false);
const showShareModal = ref<boolean>(false);
const showDeleteAlert = ref<boolean>(false);
const showQuickEditModal = ref<boolean>(false);
const activeCampaign = ref<string | null>(null);

const { mutate, status } = useDeleteCampaign();

const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div>
    <div class="space-y-6">
      <Card v-for="campaign in campaigns" :key="campaign.id">
        <CardContent class="grid grid-cols-[120px_1fr_auto] gap-6">
          <div class="flex flex-col gap-2 items-center">
            <div class="p-2 rounded-xl bg-white">
              <NuxtImg
                src="https://qrapi.beastscan.com/?size=300&margin=10&renderer=pattern&format=svg&text=https%3A%2F%2Fqrapi.beastscan.com&dots_type=hex&dots_color=%231e40af&dots_negative_color=%23c7d2fe&corners_square_type=rounded&corners_square_color=%231e40af&corners_square_background_color=%23c7d2fe&corners_dot_type=dot&corners_dot_color=%231e40af&pattern_bg=transparent"
                width="120"
                height="120"
                alt="Campaign QR"
                class="rounded-lg"
              />

              <Button
                variant="link"
                size="sm"
                class="p-0 w-full px-1 text-muted-foreground"
                @click="showCreateModal = true"
              >
                Edit QR code
              </Button>
            </div>
          </div>

          <div class="space-y-3 min-w-0">
            <div class="space-y-1.5">
              <span
                class="inline-block uppercase text-[10px] font-semibold tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full"
              >
                Digital Business Card
              </span>

              <h3
                class="text-lg font-semibold leading-tight text-foreground line-clamp-1"
              >
                {{ campaign.attributes.title }}
              </h3>

              <a
                :href="`${runtimeConfig.public.previewBase}${campaign.id}`"
                target="_blank"
                class="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline hover:text-primary/90 transition-colors"
              >
                beast.io/{{ campaign.attributes.short_code }}
                <ExternalLink class="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div class="pt-0.5">
              <TagPicker :disable-remove="true" />
            </div>
          </div>

          <div class="flex flex-col justify-between min-w-[380px] gap-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div
                  class="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Calendar class="w-3.5 h-3.5" />
                  <span class="font-medium">Sep 12, 2025</span>
                </div>
                <span
                  class="px-2.5 py-1 rounded-full bg-green-500/10 text-success text-xs font-semibold border border-green-500/20"
                >
                  Published
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="More Options"
                    class="rounded-xl h-8 w-8"
                  >
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-44">
                  <DropdownMenuItem
                    class="cursor-pointer group"
                    @click="
                      () => {
                        activeCampaign = campaign.id;
                        showQuickEditModal = true;
                      }
                    "
                  >
                    <Edit
                      class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
                    />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem class="cursor-pointer group py-0">
                    <a
                      :href="`/design?campaign=${campaign?.id}`"
                      target="_blank"
                      class="w-full h-full flex items-center py-1.5"
                    >
                      <Wrench
                        class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
                      />
                      Open in Builder
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="cursor-pointer group"
                    @click="
                      () => {
                        activeCampaign = campaign.id;
                        showShareModal = true;
                      }
                    "
                  >
                    <Share
                      class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
                    />
                    Share
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem class="cursor-pointer group">
                    <Archive
                      class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
                    />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    class="cursor-pointer"
                    @click="
                      () => {
                        activeCampaign = campaign.id;
                        showDeleteAlert = true;
                      }
                    "
                  >
                    <Trash class="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-3">
                <div
                  class="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div
                    class="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-600"
                  >
                    <Scan class="w-4.5 h-4.5" />
                  </div>
                  <div class="flex flex-col leading-tight">
                    <span class="text-lg font-semibold text-foreground"
                      >2.3k</span
                    >
                    <span
                      class="text-[11px] font-medium text-muted-foreground uppercase tracking-wide"
                      >Scans</span
                    >
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div
                    class="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <Eye class="w-4.5 h-4.5" />
                  </div>
                  <div class="flex flex-col leading-tight">
                    <span class="text-lg font-semibold text-foreground"
                      >98</span
                    >
                    <span
                      class="text-[11px] font-medium text-muted-foreground uppercase tracking-wide"
                      >Views</span
                    >
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div
                    class="flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-600"
                  >
                    <TrendingUp class="w-4.5 h-4.5" />
                  </div>
                  <div class="flex flex-col leading-tight">
                    <span class="text-lg font-semibold text-foreground"
                      >12%</span
                    >
                    <span
                      class="text-[11px] font-medium text-muted-foreground uppercase tracking-wide"
                      >Rate</span
                    >
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <NuxtLink :href="`/dashboard/campaigns/${campaign.id}`">
                  <Button
                    variant="link"
                    size="sm"
                    class="h-8 text-xs font-medium rounded-full"
                  >
                    View Analytics
                    <ArrowRight class="w-3.5 h-3.5 ml-1" />
                  </Button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <QRCodeBuilder
      v-if="showCreateModal"
      v-motion-pop
      @on-close="showCreateModal = false"
    />

    <AppShareDialog
      v-model="showShareModal"
      :link-to-copy="`${runtimeConfig.public.previewBase}${activeCampaign}`"
    />

    <AlertDialog v-model:open="showDeleteAlert">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this campaign?</AlertDialogTitle>
          <AlertDialogDescription>
            Once delete, this campaign will no longer be accesible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <StatefulButton
            :key="activeCampaign ?? nanoid(4)"
            variant="destructive"
            :status="status"
            @click="
              () =>
                mutate(activeCampaign, {
                  onSuccess() {
                    showDeleteAlert = false;
                  },
                })
            "
            >Delete</StatefulButton
          >

          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <Dialog v-model:open="showQuickEditModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update campaign</DialogTitle>
          <DialogDescription> Modify campaign details </DialogDescription>
        </DialogHeader>

        <form class="space-y-4 max-w-md">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel class="text-sm font-medium">
                Campaign Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a clear, engaging campaign title"
                  v-bind="componentField"
                  class="bg-card"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="slug">
            <FormItem>
              <FormLabel class="text-sm font-medium"> Campaign Slug </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. summer-sale-2025"
                  v-bind="componentField"
                  class="bg-card"
                />
              </FormControl>
              <FormMessage />
              <p
                v-if="null !== null"
                class="text-destructive-foreground text-sm"
              >
                {{ "x" }}
              </p>
            </FormItem>
          </FormField>

          <DialogFooter class="mt-4">
            <DialogClose as-child>
              <Button type="button" variant="outline"> Cancel </Button>
            </DialogClose>
            <StatefulButton :status="'idle'"> Update </StatefulButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
