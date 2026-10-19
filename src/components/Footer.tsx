export function Footer() {
  return (
    <footer className="px-5 sm:px-8 md:px-10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[14px] text-mute">
      <p className="flex items-center gap-2 text-ink">
        <span className="wordmark text-[17px]">Nicole Oraekie</span>
        <span aria-hidden="true">✳︎</span>
      </p>
      <p>© {new Date().getFullYear()} Nicole Oraekie</p>
      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        }
        className="min-h-11 w-fit text-left hover:text-ink transition-colors"
      >
        Back to top ↑
      </button>
    </footer>
  );
}
