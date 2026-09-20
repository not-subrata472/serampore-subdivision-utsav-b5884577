import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  passcode: z.string().min(1),
  enabled: z.boolean(),
});

export const setMaintenanceMode = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_STATUS_PASSCODE"];
    if (!expected || data.passcode !== expected) {
      throw new Error("Invalid passcode");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error: readError } = await supabaseAdmin
      .from("app_settings")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (readError) throw readError;

    if (!row) {
      const { error } = await supabaseAdmin
        .from("app_settings")
        .insert({ is_maintenance_mode: data.enabled });
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("app_settings")
        .update({ is_maintenance_mode: data.enabled })
        .eq("id", row.id);
      if (error) throw error;
    }

    return { ok: true, is_maintenance_mode: data.enabled };
  });
