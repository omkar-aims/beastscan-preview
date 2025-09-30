type FormTrigger = {
  type: "delay" | "scroll" | "exit-intent" | "floating-button";
  value: string | { icon: string; label: string };
};

type FormSchedule = {
  startDate: Date | null;
  endDate: Date | null;
};

type FormVisibility = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

type FormBehaviour = {
  trigger: FormTrigger;
  frequency:
    | "always"
    | "session"
    | "day"
    | "week"
    | "month"
    | "3months"
    | "6months"
    | "year";
  schedule: FormSchedule;
  visibility: FormVisibility;
};

export type NewForm = {
  goal: string;
  templateName: string;
  formName: string;
  formDescription?: string;
  groupName: string;
  theme: Record<string, string>;
  behaviour: FormBehaviour;
};
