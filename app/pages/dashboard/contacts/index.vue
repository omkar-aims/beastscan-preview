<script setup lang="ts">
import type { Contact } from "~/schemas/contact";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTableDropDown from "~/components/DataTableDropDown.vue";
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";

const contacts: Contact[] = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-202-555-0143",
    company: "Acme Corp",
    note: "Interested in partnership opportunities",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1-202-555-0178",
    company: "Smith & Co.",
    note: "Follow up next week",
  },
  {
    name: "Carol Lee",
    email: "carol.lee@example.com",
    phone: "+1-202-555-0127",
    company: "Tech Solutions",
    note: "Requested product demo",
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1-202-555-0191",
    company: "Innovatech",
    note: "",
  },
  {
    name: "Eva Martínez",
    email: "eva.martinez@example.com",
    phone: "+1-202-555-0155",
    company: "Global Dynamics",
    note: "Prefers email communication",
  },
  {
    name: "Frank Williams",
    email: "frank.williams@example.com",
    phone: "+1-202-555-0182",
    company: "Enterprise Inc.",
    note: undefined,
  },
  {
    name: "Grace Chen",
    email: "grace.chen@example.com",
    phone: "+1-202-555-0110",
    company: "NextGen Tech",
    note: "Interested in bulk orders",
  },
  {
    name: "Hector Alvarez",
    email: "hector.alvarez@example.com",
    phone: "+1-202-555-0164",
    company: "Alvarez Holdings",
    note: "Follow up after holiday season",
  },
  {
    name: "Isabel Nguyen",
    email: "isabel.nguyen@example.com",
    phone: "+1-202-555-0135",
    company: "VN Global",
    note: "Requested pricing details",
  },
  {
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "+1-202-555-0107",
    company: "Brown & Partners",
    note: "Schedule a call next Monday",
  },
  {
    name: "Katherine Patel",
    email: "katherine.patel@example.com",
    phone: "+1-202-555-0147",
    company: "Patel Enterprises",
    note: "Potential client lead",
  },
  {
    name: "Luis Fernandez",
    email: "luis.fernandez@example.com",
    phone: "+1-202-555-0188",
    company: "Fernandez Group",
    note: undefined,
  },
  {
    name: "Maria Gonzalez",
    email: "maria.gonzalez@example.com",
    phone: "+1-202-555-0120",
    company: "Gonzalez Logistics",
    note: "Sent brochure, waiting for reply",
  },
  {
    name: "Nathan Roberts",
    email: "nathan.roberts@example.com",
    phone: "+1-202-555-0151",
    company: "Roberts Consulting",
    note: "",
  },
  {
    name: "Olivia Wright",
    email: "olivia.wright@example.com",
    phone: "+1-202-555-0172",
    company: "Wright Innovations",
    note: "Very interested, follow up soon",
  },
];

const columns: ColumnDef<Contact>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | string) =>
          table.toggleAllPageRowsSelected(Boolean(value)),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | string) =>
          row.toggleSelected(Boolean(value)),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.getValue("phone"),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => row.getValue("company"),
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => row.getValue("note") || "-",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const device = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropDown, {
          device,
        })
      );
    },
  },
];
</script>

<template>
  <div>
    <DataTable :data="contacts" :columns="columns" filter-by="name" />
  </div>
</template>
