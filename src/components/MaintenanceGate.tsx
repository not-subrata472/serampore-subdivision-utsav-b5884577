import { useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";

export function MaintenanceGate({ children }: { children: ReactNode }) {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data } = await supabase
        .from("app_settings")
        .select("is_maintenance_mode")
        .limit(1)
        .maybeSingle();
      if (active && data) setMaintenance(Boolean(data.is_maintenance_mode));
    };
    void load();

    const channel = supabase
      .channel("app-settings-maintenance")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_settings" },
        (payload) => {
          const row = payload.new as { is_maintenance_mode?: boolean } | null;
          if (row && typeof row.is_maintenance_mode === "boolean") {
            setMaintenance(row.is_maintenance_mode);
          } else {
            void load();
          }
        },
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      {maintenance && (
        <div className="sticky top-0 z-[9999] w-full border-b border-white/20 bg-royal-deep px-4 py-4 text-center text-lg font-extrabold text-white shadow-lg sm:text-xl">
          Sorry, The site is currently in Maintenance. Certain things may not work properly, Please come again later.
        </div>
      )}
      {children}

    </>
  );
}
