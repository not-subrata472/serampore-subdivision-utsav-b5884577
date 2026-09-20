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

  if (maintenance) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            We are currently updating the website. Please check back shortly.
          </h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
