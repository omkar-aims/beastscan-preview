<template>
  <Card class="overflow-hidden">
    <CardContent class="grid grid-cols-[100px_1fr] gap-4 items-start">
      <Skeleton class="w-[100px] h-[100px] rounded-xl" />

      <div class="flex flex-col gap-3 w-full">
        <div class="flex items-center justify-between">
          <Skeleton class="h-4 w-[70%]" />
          <Skeleton class="h-4 w-16" />
        </div>

        <Skeleton class="h-3 w-[80%]" />
        <Skeleton class="h-3 w-[60%]" />

        <div class="flex justify-end mt-4">
          <Skeleton class="h-8 w-24 rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
