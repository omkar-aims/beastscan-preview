import { z } from "zod";
import type { CampaignOption } from "~/types/campaign";

export const campaignOptions: CampaignOption[] = [
  {
    title: "Website",
    desc: "Open any website URL",
    icon: "lucide:globe",
    type: "static",
    formSchema: z.object({
      url: z
        .string({ required_error: "URL is required" })
        .url("Enter a valid URL")
        .describe("Website URL"),
    }),
  },
  {
    title: "Email",
    desc: "Send an email",
    icon: "lucide:mail",
    type: "static",
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
    title: "SMS",
    desc: "Send a text message",
    icon: "lucide:message-square",
    type: "static",
    formSchema: z.object({
      phone: z
        .string({ required_error: "Phone number is required" })
        .describe("Phone Number"),
      message: z.string().describe("SMS Message").optional(),
    }),
  },
  {
    title: "Call",
    desc: "Place a quick call",
    icon: "lucide:phone",
    type: "static",
    formSchema: z.object({
      phone: z
        .string({ required_error: "Phone number is required" })
        .describe("Phone Number"),
    }),
  },
  {
    title: "Linkpage",
    desc: "Show a list of links",
    icon: "lucide:link",
    type: "dynamic",
    formSchema: z.object({
      links: z
        .array(
          z.object({
            label: z
              .string({ required_error: "Label is required" })
              .describe("Link Label"),
            url: z
              .string({ required_error: "URL is required" })
              .url("Enter a valid URL")
              .describe("Link URL"),
          }),
          { required_error: "At least one link is required" }
        )
        .min(1, "At least one link must be added"),
    }),
  },
  {
    title: "PDF",
    desc: "Show a PDF",
    icon: "lucide:file-text",
    type: "dynamic",
    formSchema: z.object({
      file: z
        .string({ required_error: "PDF file URL is required" })
        .url("Enter a valid PDF URL")
        .describe("PDF File URL"),
    }),
  },
  {
    title: "Video",
    desc: "Play a video",
    icon: "lucide:video",
    type: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Video URL is required" })
        .url("Enter a valid video link")
        .describe("Video URL (YouTube/Vimeo/etc.)"),
    }),
  },
  {
    title: "Image",
    desc: "Show an image",
    icon: "lucide:image",
    type: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Image URL is required" })
        .url("Enter a valid image URL")
        .describe("Image URL"),
      alt: z.string().optional().describe("Alt Text"),
    }),
  },
  {
    title: "Image Gallery",
    desc: "Display multiple images",
    icon: "lucide:images",
    type: "dynamic",
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
    title: "Audio",
    desc: "Play an audio file",
    icon: "lucide:music",
    type: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Audio file URL is required" })
        .url("Enter a valid audio URL")
        .describe("Audio File URL"),
    }),
  },
  {
    title: "Business Page",
    desc: "Display your business details",
    icon: "lucide:briefcase",
    type: "dynamic",
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
    title: "Facebook Page",
    desc: "Share your Facebook profile",
    icon: "lucide:facebook",
    type: "dynamic",
    formSchema: z.object({
      url: z
        .string({ required_error: "Facebook page URL is required" })
        .url("Enter a valid URL")
        .describe("Facebook Page URL"),
    }),
  },
  {
    title: "Mobile App",
    desc: "Redirect to app store",
    icon: "lucide:smartphone",
    type: "dynamic",
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
    title: "Restaurant Menu",
    desc: "Display a restaurant/bar menu",
    icon: "lucide:utensils",
    type: "dynamic",
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
    title: "Map Location",
    desc: "Open on Google Maps",
    icon: "lucide:map-pin",
    type: "dynamic",
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
    title: "Digital Business Card",
    desc: "Share contact details",
    icon: "lucide:id-card",
    type: "dynamic",
    formSchema: z.object({
      name: z
        .string({ required_error: "Name is required" })
        .describe("Full Name"),
      phone: z
        .string({ required_error: "Phone number is required" })
        .describe("Phone Number"),
      email: z
        .string()
        .email("Enter a valid email")
        .optional()
        .describe("Email"),
      company: z.string().optional().describe("Company"),
    }),
  },
  {
    title: "Wi-Fi",
    desc: "Connect to a WiFi network",
    icon: "lucide:wifi",
    type: "static",
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
          required_error: "Security type is required",
        })
        .default("WPA")
        .describe("Security type of the network"),

      hidden: z
        .boolean()
        .default(false)
        .describe("Whether the network is hidden")
        .optional(),
    }),
  },
  {
    title: "Plain Text",
    desc: "Display a short message",
    icon: "lucide:align-left",
    type: "static",
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
