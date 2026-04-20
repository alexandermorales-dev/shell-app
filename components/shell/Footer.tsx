export function Footer() {
  return (
    <footer className="h-10 border-t border-slate-200 bg-white flex items-center px-6 shrink-0">
      <p className="text-xs text-slate-400">
        &copy; {new Date().getFullYear()} SHA de Venezuela, C.A
      </p>
    </footer>
  );
}
