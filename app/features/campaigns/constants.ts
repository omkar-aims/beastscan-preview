// import {
//   IdCard,
//   UtensilsCrossed,
//   Globe,
//   Gift,
//   TicketPercent,
//   Users,
//   Sparkles,
//   ShoppingBag,
// } from "lucide-vue-next";

// export const campaignTypes = [
//   {
//     title: "Digital Business Card",
//     description:
//       "Share your contact details, social links, and company info instantly with a modern digital business card.",
//     icon: IdCard,
//     users: "2.3k",
//     gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
//   },

//   {
//     title: "Landing Page",
//     description:
//       "Create a simple promotional page to showcase products, services, or special announcements.",
//     icon: Globe,
//     users: "3.5k",
//     gradient: "linear-gradient(to top right, #38bdf8, #6366f1)",
//   },
//   {
//     title: "Product Page",
//     description:
//       "Showcase a product with beautiful images, details, pricing, and direct buy or inquiry options.",
//     icon: ShoppingBag,
//     users: "2.9k",
//     gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
//   },
//   {
//     title: "Restaurant Menu",
//     description:
//       "Display your full menu with images, prices, and categories. Update items anytime without reprinting.",
//     icon: UtensilsCrossed,
//     users: "1.8k",
//     gradient: "linear-gradient(135deg, #f97316, #facc15)",
//   },
//   {
//     title: "Gift Card",
//     description:
//       "Let customers buy, send, and redeem digital gift cards easily—perfect for special occasions.",
//     icon: Gift,
//     users: "1.2k",
//     gradient: "linear-gradient(to top right, #f43f5e, #ec4899)",
//   },
//   {
//     title: "Stamp Card",
//     description:
//       "Reward loyal customers with a digital punch card that tracks visits or purchases automatically.",
//     icon: TicketPercent,
//     users: "950",
//     gradient: "linear-gradient(to top right, #10b981, #0d9488)",
//   },
//   {
//     title: "Referral Program",
//     description:
//       "Encourage customers to refer friends and earn rewards with easy tracking through unique links or QR codes.",
//     icon: Users,
//     users: "1.7k",
//     gradient: "linear-gradient(to top right, #8b5cf6, #a21caf)",
//   },
//   {
//     title: "Giveaway",
//     description:
//       "Run engaging contests or lucky draws to boost engagement and attract new audiences.",
//     icon: Sparkles,
//     users: "2.1k",
//     gradient: "linear-gradient(to top right, #fb923c, #ef4444)",
//   },
// ];

import { IdCard, ShoppingBag, ArrowRight } from "lucide-vue-next";
import type { CampaignType } from "./types";

export const campaignTypes: CampaignType[] = [
  {
    id: "business-card",
    title: "Digital Business Card",
    description:
      "Share your contact details, social links, and company info instantly with a modern digital business card.",
    icon: IdCard,
    users: "2.3k",
    gradient: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  },
  {
    id: "product-page",
    title: "Product Page",
    description:
      "Showcase a product with images, pricing, and a clear call-to-action for purchase or enquiry.",
    icon: ShoppingBag,
    users: "2.9k",
    gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
  },
  {
    id: "redirect",
    title: "Redirect",
    description:
      "Instantly redirect users to any website, app, or deep link using a QR code or short link without any page setup.",
    icon: ArrowRight,
    users: "5.4k",
    gradient: "linear-gradient(135deg, #64748b, #475569)",
  },
];
