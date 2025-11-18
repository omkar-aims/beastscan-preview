<script setup lang="ts">
import {
  TicketPercent,
  FileText,
  Megaphone,
  MonitorSmartphone,
  QrCode,
  Plus,
  Users,
} from "lucide-vue-next";

const projects = [
  {
    id: 1,
    name: "Marketing Website Revamp",
    offers_count: 4,
    forms_count: 2,
    campaigns_count: 1,
    devices_count: 0,
    qr_codes_count: 3,
  },
  {
    id: 2,
    name: "Customer Feedback Project",
    offers_count: 0,
    forms_count: 3,
    campaigns_count: 0,
    devices_count: 1,
    qr_codes_count: 1,
  },
  {
    id: 3,
    name: "Product QR Promotion",
    offers_count: 2,
    forms_count: 1,
    campaigns_count: 2,
    devices_count: 3,
    qr_codes_count: 5,
  },
  {
    id: 4,
    name: "Hiring Campaign Portal",
    offers_count: 1,
    forms_count: 4,
    campaigns_count: 1,
    devices_count: 0,
    qr_codes_count: 2,
  },
  {
    id: 5,
    name: "Event Registration System",
    offers_count: 3,
    forms_count: 5,
    campaigns_count: 1,
    devices_count: 2,
    qr_codes_count: 4,
  },
];
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold tracking-tight">Projects</h1>
      <Button class="flex items-center gap-2">
        <Plus class="w-5 h-5" />
        Create New Project
      </Button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
      <Card v-for="project in projects" :key="project.id">
        <CardContent>
          <div class="flex items-center gap-3 mb-5">
            <h3 class="font-semibold text-lg text-card-foreground">
              {{ project.name }}
            </h3>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100"
              >
                <Megaphone class="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">
                  {{ project.campaigns_count }}
                </div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  CAMPAIGNS
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-100"
              >
                <FileText class="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">
                  {{ project.forms_count }}
                </div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  FORMS
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-sky-100"
              >
                <QrCode class="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">
                  {{ project.qr_codes_count }}
                </div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  QRS
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-rose-100"
              >
                <MonitorSmartphone class="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">
                  {{ project.devices_count }}
                </div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  DEVICES
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-purple-100"
              >
                <Users class="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">20</div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  LEADS
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl border bg-white">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-100"
              >
                <TicketPercent class="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">
                  {{ project.offers_count }}
                </div>
                <div class="text-[10px] tracking-wide text-muted-foreground">
                  OFFERS
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-5">
            <Button variant="destructive">Delete</Button>
            <Button>Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
