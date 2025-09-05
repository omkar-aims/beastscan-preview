<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>PNG</DropdownMenuItem>
      <DropdownMenuItem>JPEG</DropdownMenuItem>
      <DropdownMenuItem>SVG</DropdownMenuItem>
      <DropdownMenuItem>PDF</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
