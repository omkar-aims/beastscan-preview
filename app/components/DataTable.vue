<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/vue-table";

import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { valueUpdater } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    allowImportExport?: boolean;
    allowSearch?: boolean;
  }>(),
  {
    allowImportExport: true,
    allowSearch: true,
  }
);

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const globalFilter = ref("");

const rowSelection = ref({});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onGlobalFilterChange: (value) => (globalFilter.value = value),

  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
  },
});

const { exportCSV } = useExportCSV();
</script>

<template>
  <div>
    <div
      v-if="allowSearch && allowImportExport"
      class="flex md:items-center justify-between flex-col md:flex-row py-4 gap-2"
    >
      <Input
        v-if="allowSearch"
        v-model="globalFilter"
        class="max-w-sm bg-card"
        placeholder="Search"
      />
      <AppRow direction="horizontal">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              v-if="Object.keys(rowSelection).length > 0"
              variant="destructive"
            >
              <Icon name="lucide:trash" />
              <span>
                Delete {{ Object.keys(rowSelection).length }}
                {{
                  Object.keys(rowSelection).length > 1 ? "records" : "record"
                }}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle> Are you absolutely sure ? </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                selected {{ Object.keys(rowSelection).length }}
                {{
                  Object.keys(rowSelection).length > 1 ? "records" : "record"
                }}
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction class="p-0">
                <Button variant="destructive">Yes, delete</Button>
              </AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger>
            <Button
              v-if="Object.keys(rowSelection).length <= 0 && allowImportExport"
              variant="secondary"
            >
              <Icon name="lucide:file-down" />
              <span>Import</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import CSV</DialogTitle>
              <DialogDescription>
                Select or drag and drop a CSV file to upload. Other formats are
                not supported.
              </DialogDescription>
            </DialogHeader>

            <Input type="file" />

            <DialogFooter class="mt-4">
              <Button>Upload CSV</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          v-if="allowImportExport"
          variant="secondary"
          @click="exportCSV(props.data as object[], 'contacts.csv')"
        >
          <Icon name="lucide:file-up" />
          <span>Export</span>
        </Button>
      </AppRow>
    </div>
    <div>
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="hover:bg-transparent select-none"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="bg-card"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <div v-if="table.getCanPreviousPage()">
      <div class="flex items-center justify-end py-4 space-x-2">
        <Button
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          class="rounded-full"
          @click="table.previousPage()"
        >
          <ChevronLeft />
          <span>Prev</span>
        </Button>
        <Button
          size="sm"
          :disabled="!table.getCanNextPage()"
          class="rounded-full"
          @click="table.nextPage()"
        >
          <span>Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  </div>
</template>
