import { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard — EduHub CMS",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
