"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { InboxNotification } from "@/types";
import { markAsRead, markAllAsRead } from "@/actions/notifications";

export function NotificationsBell() {
  const [notifications, setNotifications] = useState<InboxNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const fetchNotifications = useCallback(async (uid: string) => {
    const supabase = createClient();
    const { data } = await supabase
      .schema("notify")
      .from("inbox")
      .select("id, title, body, link_path, read_at, created_at, priority, app_slug, event_key")
      .eq("recipient_id_auth", uid)
      .order("read_at", { ascending: true, nullsFirst: true })
      .order("created_at", { ascending: false })
      .limit(30);

    if (data) setNotifications(data as InboxNotification[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      await fetchNotifications(user.id);
    };
    init();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();
    const channel = supabase
      .channel("notify-inbox-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "notify",
          table: "inbox",
          filter: `recipient_id_auth=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as InboxNotification, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "notify",
          table: "inbox",
          filter: `recipient_id_auth=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === (payload.new as InboxNotification).id
                ? (payload.new as InboxNotification)
                : n
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotificationClick = async (notification: InboxNotification) => {
    if (!notification.read_at) {
      await markAsRead(notification.id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
    }
    if (notification.link_path) {
      router.push(notification.link_path);
      setOpen(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    const now = new Date().toISOString();
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read_at: n.read_at ?? now }))
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative p-2 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted",
          open && "bg-muted text-foreground"
        )}
        aria-label="Notificaciones"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-80 rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Notificaciones</span>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <span className="text-xs text-muted-foreground">Cargando...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Bell className="h-8 w-8 text-muted-foreground/25" />
                <span className="text-xs text-muted-foreground">Sin notificaciones</span>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-muted/60 transition-colors border-b border-border/40 last:border-0",
                    !n.read_at && "bg-primary/[0.04]"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    {!n.read_at ? (
                      <span className="mt-[5px] flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary" />
                    ) : (
                      <span className="mt-[5px] flex-shrink-0 h-1.5 w-1.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-xs truncate",
                          !n.read_at
                            ? "font-semibold text-foreground"
                            : "font-medium text-muted-foreground"
                        )}
                      >
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                        {n.body}
                      </p>
                      <p className="text-[10px] text-muted-foreground/50 mt-1.5">
                        {new Date(n.created_at).toLocaleString("es-VE", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
