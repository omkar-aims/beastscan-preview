<script setup lang="ts">
import { computed } from "vue";
import { useFetchProjects } from "~/composables/user/useFetchProjects";

const { data, isLoading, error, refetch } = useFetchProjects();

const projects = computed(() => data.value?.data ?? []);
const totalProjects = computed(() => data.value?.meta?.total ?? 0);
const currentPage = computed(() => data.value?.meta?.page ?? 1);
</script>

<template>
  <div class="min-h-screen bg-muted/20">
    <div class="w-full mx-auto px-6 py-10 space-y-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-foreground">Projects</h1>
          <p class="text-muted-foreground">Manage and view all your projects</p>
        </div>
        <Button @click="refetch" :disabled="isLoading" variant="default">
          <span v-if="!isLoading">Refresh</span>
          <span v-else>Loading...</span>
        </Button>
      </div>

      <!-- Total Projects -->
      <div class="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-md font-medium">
        Total Projects: 
        <span class="ml-2 font-bold text-primary">{{ totalProjects }}</span>
      </div>

      <ClientOnly>
        <template #fallback>
          <div class="flex items-center justify-center py-20 text-muted-foreground">
            Loading projects...
          </div>
        </template>

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center justify-center py-20">
          <div class="text-center text-muted-foreground">
            <div class="animate-spin h-10 w-10 rounded-full border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading projects...</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="max-w-md mx-auto">
          <Card class="border-destructive/50 bg-destructive/10 text-destructive text-center">
            <CardHeader>
              <h3 class="text-lg font-semibold">Failed to Load Projects</h3>
            </CardHeader>
            <CardContent>
              <p>{{ error.message || "An error occurred while loading projects." }}</p>
            </CardContent>
            <CardFooter class="flex justify-center">
              <Button variant="destructive" @click="refetch">Try Again</Button>
            </CardFooter>
          </Card>
        </div>

        <!-- Empty -->
        <div v-else-if="projects.length === 0" class="max-w-md mx-auto">
          <Card class="text-center">
            <CardHeader>
              <h3 class="text-xl font-semibold">No Projects Found</h3>
            </CardHeader>
            <CardContent class="text-muted-foreground">
              <p>Get started by creating your first project.</p>
            </CardContent>
            <CardFooter class="flex justify-center">
              <Button variant="default">Create Project</Button>
            </CardFooter>
          </Card>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="project in projects"
            :key="project.id"
            class="group border-primary/10 hover:border-primary/50 transition-all duration-200"
          >
            <CardHeader>
              <h2 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {{ project.attributes.name }}
              </h2>
              <p class="text-sm text-muted-foreground">{{ project.attributes.slug }}</p>
            </CardHeader>

            <CardContent class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="w-20 text-muted-foreground">Type:</span>
                <Badge variant="secondary">{{ project.type }}</Badge>
              </div>

              <div class="flex items-center text-sm">
                <span class="w-20 text-muted-foreground">ID:</span>
                <code class="px-2 py-0.5 rounded bg-muted text-foreground text-xs">
                  {{ project.id.slice(0, 8) }}...
                </code>
              </div>

              <div class="flex items-center text-sm">
                <span class="w-20 text-muted-foreground">Account:</span>
                <code class="px-2 py-0.5 rounded bg-muted text-foreground text-xs">
                  {{ project.attributes.account_id.slice(0, 8) }}...
                </code>
              </div>
            </CardContent>

            <Separator />

            <CardFooter>
              <Button class="w-full" variant="outline">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>

        <!-- Pagination -->
        <div v-if="projects.length > 0" class="text-center text-sm text-muted-foreground mt-6">
          Showing {{ projects.length }} of {{ totalProjects }} projects
          <span v-if="currentPage > 1">• Page {{ currentPage }}</span>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
