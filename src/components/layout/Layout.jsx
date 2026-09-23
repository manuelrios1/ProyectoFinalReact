import Head from "./Head";

function Layout({children}) {
  return (
    <div className="min-h-screen bg-white dark:bg-emerald-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Head/>
      <main className="pt-30">
        {children}
      </main>
    </div>
  )
}

export default Layout;