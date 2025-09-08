import { json2csv } from "json-2-csv";
import { toast } from "vue-sonner";
export function useExportCSV() {
  const exportCSV = (data: object[], filename = "export.csv") => {
    const csv = json2csv(data, {
      prependHeader: true,
      sortHeader: true,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported successfully");
  };

  return {
    exportCSV,
  };
}
