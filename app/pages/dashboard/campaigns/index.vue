<script setup lang="ts">

import { 
  CreditCard, 
  Plus, 
  Link2, 
  Calendar,
  Eye,
  Globe,
  QrCode,
  Mail,
  FileText,
  Share2
} from 'lucide-vue-next'

interface Campaign {
  type: string
  id: string
  attributes: {
    title: string
    slug: string
    short_code: string
    status: string
    published_at: string | null
    project_id: string
  }
}

// Sample data with multiple campaigns
const campaigns: Campaign[] = [
  {
    type: "Digital Business Card",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d25",
    attributes: {
      title: "Demo Campaign",
      slug: "demo-campaign",
      short_code: "c-zPa95a",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439987",
    },
  },
  {
    type: "Landing Page",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d26",
    attributes: {
      title: "Product Launch",
      slug: "product-launch",
      short_code: "c-aB3c4d",
      status: "published",
      published_at: "2024-10-15T10:30:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439988",
    },
  },
  {
    type: "QR Code Campaign",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d27",
    attributes: {
      title: "Restaurant Menu",
      slug: "restaurant-menu",
      short_code: "c-xY7z8w",
      status: "published",
      published_at: "2024-09-20T14:45:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439989",
    },
  },
  {
    type: "Email Campaign",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d28",
    attributes: {
      title: "Newsletter October",
      slug: "newsletter-october",
      short_code: "c-mN5p6q",
      status: "draft",
      published_at: null,
      project_id: "0199e10f-d13d-7ea3-9065-88d328439990",
    },
  },
  {
    type: "Landing Page",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d29",
    attributes: {
      title: "Black Friday Sale",
      slug: "black-friday-sale",
      short_code: "c-rS9t0u",
      status: "scheduled",
      published_at: "2024-11-25T00:00:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439991",
    },
  },
  {
    type: "Digital Business Card",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d30",
    attributes: {
      title: "Personal Portfolio",
      slug: "personal-portfolio",
      short_code: "c-vW1x2y",
      status: "published",
      published_at: "2024-08-10T09:15:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439992",
    },
  },
  {
    type: "Social Share",
    id: "0199f1cd-ff16-7b16-803c-a777daa26d31",
    attributes: {
      title: "Event Promotion",
      slug: "event-promotion",
      short_code: "c-zA3b4c",
      status: "archived",
      published_at: "2024-07-05T16:20:00Z",
      project_id: "0199e10f-d13d-7ea3-9065-88d328439993",
    },
  },
]

const getIcon = (type: string) => {
  const iconMap: Record<string, any> = {
    'Digital Business Card': CreditCard,
    'Landing Page': Globe,
    'QR Code Campaign': QrCode,
    'Email Campaign': Mail,
    'Social Share': Share2,
  }
  return iconMap[type] || FileText
}

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-green-100 text-green-700',
    scheduled: 'bg-blue-100 text-blue-700',
    archived: 'bg-orange-100 text-orange-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Campaigns</h1>
      <NuxtLink to="/dashboard/campaigns/new">
        <Button>
          <Plus class="w-5 h-5" />
          Launch New Campaign
        </Button>
      </NuxtLink>
    </div>

    <!-- Campaign Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="campaign in campaigns" 
        :key="campaign.id"
      
      >
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3 flex-1">
              <div class="p-3 bg-primary/20 rounded-xl flex-shrink-0">
                <component :is="getIcon(campaign.type)" class="w-6 h-6 text-chart-4" />
              </div>
              <div class="flex-1 min-w-0">
                <CardTitle class="text-lg font-semibold truncate">
                  {{ campaign.attributes.title }}
                </CardTitle>
                <Badge variant="default" class="text-xs px-2 py-0" >{{ campaign.type }}</Badge>
              </div>
            </div>
            <Badge 
              variant="secondary"
              :class="getStatusColor(campaign.attributes.status)"
              class="flex-shrink-0"
            >
              {{ campaign.attributes.status }}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent class="space-y-4">
          <!-- Campaign Details -->
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <Link2 class="w-4 h-4 text-muted-foreground" />
              <span class="text-muted-foreground">Campaign:</span>
              <span class="font-medium truncate">{{ campaign.attributes.slug }}</span>
            </div>
            
            
            <div class="flex items-center gap-2 text-sm">
              <Calendar class="w-4 h-4 text-muted-foreground" />
              <span class="text-muted-foreground">Published:</span>
              <span>
                {{ campaign.attributes.published_at ? formatDate(campaign.attributes.published_at) : 'Not published' }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2 pt-2">
            <NuxtLink class="flex-1">
              <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                <Eye class="w-4 h-4" />
                View
              </Button>
            </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

