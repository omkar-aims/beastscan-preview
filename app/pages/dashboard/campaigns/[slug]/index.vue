<script setup lang="ts">
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  Edit3,
  LayoutDashboard,
  Trash2,
  MoreHorizontal,
} from "lucide-vue-next";
import AppHeading from "~/components/AppHeading.vue";
import { useCampaign } from "~/composables/campaign/useCampaign";
import { useDeleteCampaign } from "~/composables/campaign/useDeleteCampaign";

const route = useRoute();

const { data: campaign, isLoading } = useCampaign(route.params.slug);
const { mutate, status } = useDeleteCampaign();
const runtimeConfig = useRuntimeConfig();

const topStats = [
  {
    label: "Total Views",
    value: 35400,
    trend: "+6%",
    trendDirection: "up",
  },
  {
    label: "New Views",
    value: 1800,
    trend: "+3%",
    trendDirection: "up",
  },
  {
    label: "Conversions",
    value: 10200,
    trend: "-1%",
    trendDirection: "down",
  },
];

const promos = [
  {
    title: "Order Custom Flyers",
    description:
      "High-quality promotional flyers delivered fast. Perfect for events, campaigns, and branding.",
    cta: "Order Flyers",
    icon: "promo/flyers.svg",
    gradient: "linear-gradient(135deg, #fb923c, #f43f5e)",
  },
  {
    title: "Order Custom Stickers",
    description:
      "Premium stickers for packaging, branding, and giveaways. Durable and vibrant finish.",
    cta: "Order Stickers",
    icon: "promo/sticker.svg",
    gradient: "linear-gradient(135deg, #6366f1, #3b82f6)",
  },
  {
    title: "Flyer + Sticker Bundle",
    description:
      "Save more with our special bundle — get flyers and stickers together at a discounted price.",
    cta: "Get Bundle",
    icon: "promo/box.svg",
    gradient: "linear-gradient(135deg, #34d399, #10b981)",
  },
];

const showDeleteAlert = ref<boolean>(false);
const showQuickEditModal = ref<boolean>(false);
</script>

<template>
  <section v-if="campaign" class="space-y-6">
    <div class="flex justify-between items-center">
      <AppHeading :level="3">Campaign Overview</AppHeading>
      <ButtonGroup>
        <Button
          class="bg-card text-card-foreground hover:text-primary-foreground rounded-md border-r"
          @click="
            async () =>
              await navigateTo(
                `${runtimeConfig.public.previewBase}${campaign.id}`,
                {
                  external: true,
                }
              )
          "
        >
          <ExternalLink class="w-4 h-4" />
          Visit
        </Button>

        <Button
          class="bg-card text-card-foreground hover:text-primary-foreground rounded-md border-r"
          @click="showQuickEditModal = true"
        >
          <Edit3 class="w-4 h-4" />
          Quick Edit
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              class="bg-card text-card-foreground hover:text-primary-foreground rounded-md border-r"
              size="icon"
              aria-label="More Options"
            >
              <MoreHorizontal class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuItem as="div" class="group py-0 cursor-pointer">
              <a
                :href="`/design?campaign=${campaign?.id}`"
                target="_blank"
                class="w-full h-full flex items-center py-1.5"
              >
                <LayoutDashboard
                  class="w-4 h-4 mr-2 group-hover:text-primary-foreground"
                />
                Open in Builder
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem
              class="cursor-pointer"
              variant="destructive"
              @click="showDeleteAlert = true"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>

    <div v-if="campaign">
      <Card>
        <CardContent>
          <div class="grid grid-cols-[1fr_140px] gap-6">
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

            <div class="flex flex-col items-center">
              <div class="rounded-xl bg-white">
                <NuxtImg
                  src="https://qrapi.beastscan.com/?size=300&margin=10&renderer=pattern&format=svg&text=https%3A%2F%2Fqrapi.beastscan.com&dots_type=hex&dots_color=%231e40af&dots_negative_color=%23c7d2fe&corners_square_type=rounded&corners_square_color=%231e40af&corners_square_background_color=%23c7d2fe&corners_dot_type=dot&corners_dot_color=%231e40af&pattern_bg=transparent"
                  width="160"
                  height="160"
                  alt="Campaign QR"
                  class="rounded-lg"
                />
              </div>
              <Button variant="link" class="text-muted-foreground"
                >Edit QR Code</Button
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div>
      <AppHeading :level="4" class="mb-4">Promote</AppHeading>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="(promo, idx) in promos"
          :key="idx"
          class="relative group overflow-hidden rounded-xl p-7 text-white shadow-md transition-all duration-300 hover:shadow-2xl"
          :style="{ background: promo.gradient }"
        >
          <div class="relative space-y-4">
            <AppHeading :level="3" class="font-semibold tracking-wide">
              {{ promo.title }}
            </AppHeading>

            <p class="text-sm text-white/90 leading-relaxed max-w-[85%]">
              {{ promo.description }}
            </p>

            <Button
              class="mt-3 rounded-full px-5 py-2 text-sm font-medium bg-white text-black shadow-md hover:bg-white/90 transition-colors"
            >
              {{ promo.cta }}
              <ArrowRight />
            </Button>

            <NuxtImg
              :src="promo.icon"
              class="w-20 h-20 absolute bottom-0 right-0 opacity-70 rotate-6 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center">
        <AppHeading :level="4"> Scan stats </AppHeading>

        <Button
          variant="link"
          @click="
            navigateTo(`/dashboard/campaigns/${route.params.slug}/analytics/`)
          "
          >View Detail Analytics <ArrowRight
        /></Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          v-for="stat in topStats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :trend="stat.trend"
        />
      </div>
    </div>

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

          <FormField v-slot="{ componentField }" name="alias">
            <FormItem>
              <FormLabel class="text-sm font-medium"
                >Alias (Optional)</FormLabel
              >
              <FormControl>
                <Input
                  placeholder="Short alternate name "
                  v-bind="componentField"
                  class="bg-card"
                />
              </FormControl>
              <FormMessage />
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
            variant="destructive"
            :status="status"
            @click="() => mutate(route.params.slug)"
            >Delete</StatefulButton
          >

          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </section>
</template>
