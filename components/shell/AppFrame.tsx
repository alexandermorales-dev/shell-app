"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { AppFrameProps } from "@/types";
import { createClient } from "@/lib/supabase/client";

export function AppFrame({ src, title }: AppFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  async function sendAuthToFrame() {
    if (!iframeRef.current?.contentWindow) return;
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;

    try {
      const targetOrigin = new URL(src).origin;
      iframeRef.current.contentWindow.postMessage(
        {
          type: "SHELL_AUTH",
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        },
        targetOrigin
      );
    } catch {
      // Swallow invalid URL or cross-origin errors
    }
  }

  return (
    <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 8rem)' }}>
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Cargando {title}...</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-3 text-center max-w-sm p-6">
            <p className="text-sm font-medium text-foreground">
              No se pudo cargar {title}
            </p>
            <p className="text-xs text-muted-foreground">
              Verifica que la aplicación esté disponible e intenta nuevamente.
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (iframeRef.current) {
                  iframeRef.current.src = src;
                }
              }}
              className="mt-2 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full h-full border-0"
        onLoad={() => {
          setIsLoading(false);
          sendAuthToFrame();
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        allow="clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
      />
    </div>
  );
}
