import { AppRouter } from "@/config";
import { redirect } from "next/navigation";
//v2
export default function Home() {
  redirect(AppRouter.adminHome)
}
