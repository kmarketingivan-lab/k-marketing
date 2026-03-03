export default function RootNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-navy-800">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-orange-500">404</p>
        <h1 className="mt-4 text-3xl font-bold text-navy-800 dark:text-gray-100">
          Pagina non trovata
        </h1>
        <a
          href="/"
          className="mt-8 inline-block rounded-md bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-400"
        >
          Torna alla home
        </a>
      </div>
    </div>
  );
}
