export default function SidebarLoading() {
  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      <div className="h-8 rounded-md bg-muted animate-pulse" />
      <div className="pt-3 pb-2 px-3">
        <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="space-y-1">
          <div className="h-8 rounded-md bg-muted animate-pulse" />
          <div className="ml-4 pl-3 border-l border-border space-y-1 mt-1">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-7 rounded-md bg-muted/60 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
