import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { setMaintenanceMode } from "@/lib/maintenance.functions";

export const Route = createFileRoute("/admin-status")({
  head: () => ({
    meta: [
      { title: "Site Status Control | Serampore Utsav" },
      {
        name: "description",
        content: "Private control panel to switch the Serampore Utsav website into maintenance mode.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Site Status Control | Serampore Utsav" },
      {
        property: "og:description",
        content: "Private control panel to switch the Serampore Utsav website into maintenance mode.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminStatusPage,
});

function AdminStatusPage() {
  const [passcode, setPasscode] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const toggleMaintenance = useServerFn(setMaintenanceMode);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("app_settings")
        .select("is_maintenance_mode")
        .limit(1)
        .maybeSingle();
      if (active && data) setEnabled(Boolean(data.is_maintenance_mode));
    };
    void load();

    const channel = supabase
      .channel("admin-status-app-settings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_settings" },
        (payload) => {
          const row = payload.new as { is_maintenance_mode?: boolean } | null;
          if (row && typeof row.is_maintenance_mode === "boolean") {
            setEnabled(row.is_maintenance_mode);
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

  const handleToggle = async (e: FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      toast.error("Enter the admin passcode first.");
      return;
    }

    setSaving(true);
    const next = !enabled;
    const previous = enabled;
    setEnabled(next);
    try {
      await toggleMaintenance({ data: { passcode, enabled: next } });
      toast.success(next ? "Maintenance mode is ON" : "Maintenance mode is OFF");
    } catch {
      setEnabled(previous);
      toast.error("Could not update. Check the passcode.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Toaster />
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-foreground">Site status</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the admin passcode and click the button to switch the current maintenance state.
          </p>
        </div>

        <form onSubmit={handleToggle} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="passcode">Admin passcode</Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              disabled={saving}
            />
          </div>

          <div
            className={`rounded-xl border px-4 py-3 text-center text-sm font-bold ${
              enabled
                ? "border-amber-300 bg-amber-100 text-amber-900"
                : "border-emerald-300 bg-emerald-100 text-emerald-900"
            }`}
            role="status"
          >
            Maintenance Mode: {enabled ? "Turned on" : "Turned off"}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!passcode || saving}
          >
            {saving ? "Updating..." : "Toggle Maintenance Mode"}
          </Button>
        </form>

        <Button variant="outline" className="w-full" asChild>
          <a href="/">Back to site</a>
        </Button>
      </div>
    </main>
  );
}
