import { z } from "zod";
import type { CampaignOption } from "~/types/campaign";

export const campaignOptions: CampaignOption[] = [
  {
    type: "Website",
    description: "Open any website URL",
    icon: "lucide:globe",
    mode: "static",
    formSchema: z.object({
      url: z
        .string({ required_error: "URL is required" })
        .url("Enter a valid URL")
        .describe("Website URL"),
    }),
  },
  {
    type: "Email",
    description: "Send an email",
    icon: "lucide:mail",
    mode: "static",
    formSchema: z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Enter a valid email")
        .describe("Recipient Email"),
      subject: z.string().describe("Subject").optional(),
      body: z.string().describe("Message").optional(),
    }),
  },
  {
    type: "SMS",
    description: "Send a text message",
    icon: "lucide:message-square",
    mode: "static",
    formSchema: z.object({
      phone: z
        .string({ required_error: "Phone number is required" })
        .describe("Phone Number"),
      message: z.string().describe("SMS Message").optional(),
    }),
  },
  {
    type: "Call",
    description: "Place a quick call",
    icon: "lucide:phone",
    mode: "static",
    formSchema: z.object({
      phone: z
        .string({ required_error: "Phone number is required" })
        .describe("Phone Number"),
    }),
  },
  {
    type: "PDF",
    description: "Show a PDF",
    icon: "lucide:file-text",
    mode: "dynamic",
    formSchema: z.object({
      file: z
        .string({ required_error: "PDF file URL is required" })
        .url("Enter a valid PDF URL")
        .describe("PDF File URL"),
    }),
  },
  {
    type: "Video",
    description: "Play a video",
    icon: "lucide:video",
    mode: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Video URL is required" })
        .url("Enter a valid video link")
        .describe("Video URL (YouTube/Vimeo/etc.)"),
    }),
  },
  {
    type: "Image",
    description: "Show an image",
    icon: "lucide:image",
    mode: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Image URL is required" })
        .url("Enter a valid image URL")
        .describe("Image URL"),
      alt: z.string().optional().describe("Alt Text"),
    }),
  },
  {
    type: "Image Gallery",
    description: "Display multiple images",
    icon: "lucide:images",
    mode: "dynamic",
    formSchema: z.object({
      images: z
        .array(
          z.object({
            url: z
              .string({ required_error: "Image URL is required" })
              .url("Enter a valid image URL")
              .describe("Image URL"),
            caption: z.string().optional().describe("Caption"),
          }),
          { required_error: "At least one image is required" }
        )
        .min(1, "At least one image must be added"),
    }),
  },
  {
    type: "Audio",
    description: "Play an audio file",
    icon: "lucide:music",
    mode: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Audio file URL is required" })
        .url("Enter a valid audio URL")
        .describe("Audio File URL"),
    }),
  },
  {
    type: "Business Page",
    description: "Display your business details",
    icon: "lucide:briefcase",
    mode: "dynamic",
    formSchema: z.object({
      name: z
        .string({ required_error: "Business name is required" })
        .describe("Business Name"),
      description: z
        .string({ required_error: "Business description is required" })
        .describe("Business Description"),
      website: z
        .string()
        .url("Enter a valid website URL")
        .optional()
        .describe("Website URL"),
    }),
  },

  {
    type: "Facebook Page",
    description: "Share your Facebook profile",
    icon: "lucide:facebook",
    mode: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Facebook page URL is required" })
        .url("Enter a valid URL")
        .describe("Facebook Page URL"),
    }),
  },
  {
    type: "Mobile App",
    description: "Redirect to app store",
    icon: "lucide:smartphone",
    mode: "dynamic",
    formSchema: z.object({
      iosUrl: z
        .string()
        .url("Enter a valid iOS app link")
        .optional()
        .describe("iOS App Store URL"),
      androidUrl: z
        .string()
        .url("Enter a valid Android app link")
        .optional()
        .describe("Google Play URL"),
    }),
  },
  {
    type: "Restaurant Menu",
    description: "Display a restaurant/bar menu",
    icon: "lucide:utensils",
    mode: "dynamic",
    formSchema: z.object({
      items: z
        .array(
          z.object({
            name: z
              .string({ required_error: "Dish name is required" })
              .describe("Dish Name"),
            price: z
              .string({ required_error: "Price is required" })
              .describe("Price"),
            description: z.string().optional().describe("Description"),
          }),
          { required_error: "At least one menu item is required" }
        )
        .min(1, "At least one menu item must be added"),
    }),
  },
  {
    type: "Map Location",
    description: "Open on Google Maps",
    icon: "lucide:map-pin",
    mode: "dynamic",
    formSchema: z.object({
      latitude: z
        .string({ required_error: "Latitude is required" })
        .describe("Latitude"),
      longitude: z
        .string({ required_error: "Longitude is required" })
        .describe("Longitude"),
    }),
  },
  {
    type: "Digital Business Card",
    description: "Share contact details",
    icon: "lucide:id-card",
    mode: "dynamic",
    formSchema: z.object({
      profilePhoto: z
        .string({ required_error: "Profile photo URL is required" })
        .url("Must be a valid URL")
        .describe("Profile Photo URL"),

      name: z.object({
        fullName: z
          .string({ required_error: "Full name is required" })
          .describe("Full Name"),

        middleName: z.string().optional().describe("Middle Name"),

        lastName: z.string().optional().describe("Last Name"),
      }),

      bio: z.string().optional().describe("Short Bio"),

      job: z.object({
        type: z.string().optional().describe("Job Type"),
        company: z.string().optional().describe("Company"),
      }),

      phone: z.object({
        personal: z.string().optional().describe("Personal Phone"),
        business: z.string().optional().describe("Business Phone"),
      }),

      email: z.object({
        personal: z
          .string()
          .email("Enter a valid personal email")
          .optional()
          .describe("Personal Email"),

        business: z
          .string()
          .email("Enter a valid business email")
          .optional()
          .describe("Business Email"),
      }),

      address: z.string().optional().describe("Address"),

      socialLinks: z
        .array(
          z.object({
            mode: z
              .enum([
                "whatsapp",
                "facebook",
                "instagram",
                "linkedin",
                "twitter",
                "tiktok",
                "website",
              ])
              .describe("Social platform mode"),

            url: z
              .string()
              .url("Enter a valid URL")
              .describe("Social link URL"),
          })
        )
        .optional()
        .describe("Social links"),

      callToAction: z.string().optional().describe("Call To Action"),
    }),
  },
  {
    type: "Form",
    description: "Create a form to capture leads",
    icon: "lucide:text-cursor-input",
    mode: "dynamic",
    formSchema: z.object({
      submitURL: z.string().url().describe("Submit URL"),
      buttonLabel: z.string().describe("Button Label"),
    }),
  },
  {
    type: "Wi-Fi",
    description: "Connect to a WiFi network",
    icon: "lucide:wifi",
    mode: "static",
    formSchema: z.object({
      ssid: z
        .string({ required_error: "SSID is required" })
        .min(1, "SSID cannot be empty")
        .describe("Network SSID"),

      password: z
        .string()
        .optional()
        .describe("Password (leave empty for open networks)"),

      security: z
        .enum(["WPA", "WEP", "nopass"], {
          required_error: "Security mode is required",
        })
        .default("WPA")
        .describe("Security mode of the network"),

      hidden: z
        .boolean()
        .default(false)
        .describe("Whether the network is hidden")
        .optional(),
    }),
  },
  {
    type: "Plain Text",
    description: "Display a short message",
    icon: "lucide:align-left",
    mode: "static",
    formSchema: z.object({
      text: z
        .string({ required_error: "Message is required" })
        .describe("Message"),
    }),
  },
];

export const campaignLogos = [
  { key: "website", logo: "https://img.icons8.com/color/48/chrome--v1.png" },
  { key: "email", logo: "https://img.icons8.com/color/48/gmail-new.png" },
  { key: "sms", logo: "https://img.icons8.com/color/48/sms.png" },
  { key: "call", logo: "https://img.icons8.com/color/48/phone.png" },

  { key: "linkpage", logo: "https://img.icons8.com/color/48/link.png" },
  {
    key: "form",
    logo: "https://img.icons8.com/color/48/google-forms-new-logo-1.png",
  },
  { key: "pdf", logo: "https://img.icons8.com/color/48/pdf.png" },
  { key: "video", logo: "https://img.icons8.com/color/48/youtube-play.png" },
  { key: "image", logo: "https://img.icons8.com/color/48/image.png" },
  { key: "imagegallery", logo: "https://img.icons8.com/color/48/gallery.png" },
  { key: "audio", logo: "https://img.icons8.com/color/48/musical-notes.png" },

  {
    key: "businesspage",
    logo: "https://img.icons8.com/color/48/briefcase.png",
  },
  {
    key: "facebookpage",
    logo: "https://img.icons8.com/color/48/facebook-new.png",
  },
  { key: "event", logo: "https://img.icons8.com/color/48/calendar--v1.png" },
  { key: "mobileapp", logo: "https://img.icons8.com/color/48/google-play.png" },
  { key: "feedback", logo: "https://img.icons8.com/color/48/star--v1.png" },
  { key: "coupon", logo: "https://img.icons8.com/color/48/coupon.png" },
  {
    key: "restaurantmenu",
    logo: "https://img.icons8.com/color/48/restaurant-menu.png",
  },
  {
    key: "maplocation",
    logo: "https://img.icons8.com/color/48/google-maps-new.png",
  },

  {
    key: "digitalcard",
    logo: "https://img.icons8.com/color/48/contact-card.png",
  },
  { key: "wifi", logo: "https://img.icons8.com/color/48/wifi.png" },
  { key: "plaintext", logo: "https://img.icons8.com/color/48/note.png" },
];
