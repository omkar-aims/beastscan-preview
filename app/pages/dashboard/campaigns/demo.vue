<template>
  <div>
    <FileUpload v-slot="{ file, handleSelect }">
      <Input type="file" accept=".pdf" @change="handleSelect" />
      <NuxtImg v-if="file" :src="file" />
    </FileUpload>
  </div>
</template>
