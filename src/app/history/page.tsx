import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { dbConnect, getFeynmanAnalysesByUserId } from "@/features/db";
import { redirect } from "next/navigation";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  await dbConnect();

  const analyses = await getFeynmanAnalysesByUserId(session.user.id);

  return <HistoryClient analyses={JSON.parse(JSON.stringify(analyses))} />;
}
