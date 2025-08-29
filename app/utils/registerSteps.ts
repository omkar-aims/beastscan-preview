export interface StepField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; 
  default?: string;  
}

export interface Step {
  fields: StepField[];
  image: string;
}

export const steps: Step[] = [
  {
    fields: [
      { id: "type", label: "Account Type", type: "select", placeholder: "e.g. user", required: true}
    ],
    image: "https://images.unsplash.com/photo-1601751839176-7d023cb55ed8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBvciUyMGFkbWlufGVufDB8fDB8fHww"
  },
  {
    fields: [
      { id: "locale", label: "Locale", type: "text", placeholder: "e.g. en", required: true}
    ],
    image: "https://images.unsplash.com/photo-1735825764478-674bb8df9d4a?w=600&auto=format&fit=crop&q=60"
  },
  {
    fields: [
      { id: "email", label: "Email", type: "email", placeholder: "m@example.com", required: true }
    ],
    image: "https://media.istockphoto.com/id/1347685642/photo/smiling-young-asian-woman-shopping-online-with-smartphone.webp?a=1&b=1&s=612x612"
  },
  {
    fields: [
      { id: "password", label: "Password", type: "password", required: true }
    ],
    image: "https://images.unsplash.com/photo-1634224143538-ce0221abf732?w=600&auto=format&fit=crop&q=60"
  }
];
