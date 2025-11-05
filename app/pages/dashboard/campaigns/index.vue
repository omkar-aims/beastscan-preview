<script setup lang="ts">
import { useCampaigns } from "~/composables/campaign/useCampaigns";
import { 
  CreditCard, Plus, Link2, Calendar, Eye, Globe, QrCode, Mail, FileText, Share2, 
  Pencil
} from "lucide-vue-next"

const { data: campaigns, isLoading, isError } = useCampaigns()

const getIcon = (type: string) => {
  const iconMap: Record<string, any> = {
    "Digital Business Card": CreditCard,
    "Landing Page": Globe,
    "QR Code Campaign": QrCode,
    "Email Campaign": Mail,
    "Social Share": Share2,
  }
  return iconMap[type] || FileText
}

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    published: "bg-green-100 text-green-700",
    scheduled: "bg-blue-100 text-blue-700",
    archived: "bg-orange-100 text-orange-700",
  }
  return colors[status] || "bg-gray-100 text-gray-700"
}

const formatDate = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

</script>


<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Campaigns
      </h1>
      <NuxtLink to="/dashboard/campaigns/new" class="w-full sm:w-auto">
        <Button class="w-full sm:w-auto flex items-center justify-center gap-2">
          <Plus class="w-5 h-5" />
          Launch New Campaign
        </Button>
      </NuxtLink>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-muted-foreground">
      Loading campaigns...
    </div>

    <div v-else-if="isError" class="text-center py-10 text-red-500">
      Failed to load campaigns.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      <Card v-for="campaign in campaigns" :key="campaign.id" class="flex flex-col">
        <CardHeader class="pb-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex items-start gap-3 flex-1 min-w-0">
              <div class="p-3 bg-primary/20 rounded-xl flex-shrink-0">
                <component :is="getIcon(campaign.type)" class="w-6 h-6 text-chart-4" />
              </div>
              <div class="flex-1 min-w-0">
                <CardTitle class="text-base sm:text-lg font-semibold truncate">
                  {{ campaign.attributes.title }}
                </CardTitle>
                <Badge variant="default" class="text-xs px-2 py-0">
                  {{ campaign.type }}
                </Badge>
              </div>
            </div>
            <Badge
              variant="secondary"
              :class="getStatusColor(campaign.attributes.status)"
              class="flex-shrink-0 text-xs sm:text-sm"
            >
              {{ campaign.attributes.status }}
            </Badge>
          </div>
        </CardHeader>

        <CardContent class="space-y-4 flex flex-col flex-grow">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2 text-sm truncate">
              <Link2 class="w-4 h-4 text-muted-foreground" />
              <span class="text-muted-foreground">Campaign:</span>
              <span class="font-medium truncate">{{ campaign.attributes.slug }}</span>
            </div>

            <div class="flex flex-wrap items-center gap-2 text-sm truncate">
              <Calendar class="w-4 h-4 text-muted-foreground" />
              <span class="text-muted-foreground">Published:</span>
              <span>
                {{
                  campaign.attributes.published_at
                    ? formatDate(campaign.attributes.published_at)
                    : "Not published"
                }}
              </span>
            </div>
          </div>
 
          <div class="mt-auto pt-2 flex gap-2">
            <NuxtLink class="w-full">
              <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                <Eye class="w-4 h-4" />
                View
              </Button>
            </NuxtLink>
            <NuxtLink class="w-full">
              <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                <Pencil class="w-4 h-4" />
                Edit
              </Button>
            </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>



