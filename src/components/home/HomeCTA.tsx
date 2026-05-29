import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import HomeCTAInner from "./HomeCTAInner";

const getWaitlistCount = unstable_cache(
  async (): Promise<number | null> => {
    try {
      const { count, error } = await supabaseAdmin
        .from("leads_karica")
        .select("*", { count: "exact", head: true })
        .eq("source", "waitlist");
      if (error) return null;
      return count ?? 0;
    } catch {
      return null;
    }
  },
  ["waitlist-count"],
  { revalidate: 300, tags: ["waitlist"] }
);

export default async function HomeCTA() {
  const count = await getWaitlistCount();
  return <HomeCTAInner count={count} />;
}
