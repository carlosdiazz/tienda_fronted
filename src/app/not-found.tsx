import { AppRouter } from "@/config";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(AppRouter.adminHome);
}