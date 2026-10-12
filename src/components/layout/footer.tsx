export function Footer() {
  return (
    <footer className="bg-frosted-white">
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] flex-col justify-center gap-2 px-5 py-6 text-espresso md:flex-row md:items-center md:justify-between md:px-10 xl:px-16">
        <p className="font-body text-badge font-semibold tracking-badge-caps uppercase">
          A two-person studio · data, development and AI
        </p>
        <p className="font-body text-badge font-semibold tracking-footer-caps uppercase">
          Small and personal · every project counts
        </p>
      </div>
    </footer>
  );
}
