import { Metadata } from "next";
import ProfilePageClient from "@/components/pages/ProfilePageClient";

export const metadata: Metadata = {
  title: "Profile - ALIBYME",
  description:
    "Manage your anime collection, favorites, and watch status. Track your progress and discover your anime preferences.",
  keywords: [
    "anime profile",
    "watch list",
    "favorites",
    "anime collection",
    "anime tracker",
  ],
  openGraph: {
    title: "Profile - ALIBYME",
    description: "Manage your anime collection, favorites, and watch status.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile - ALIBYME",
    description: "Manage your anime collection, favorites, and watch status.",
  },
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
