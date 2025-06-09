import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation horizontale en haut */}
      <header className="w-full flex-shrink-0">
        <Sidebar />
      </header>
      
      {/* Contenu principal en dessous */}
      <main className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;