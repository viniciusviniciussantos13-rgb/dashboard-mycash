import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSidebar } from './hooks/useSidebar'
import Sidebar from './components/layout/Sidebar/Sidebar'
import HeaderMobile from './components/layout/HeaderMobile/HeaderMobile'
import MainContainer from './components/layout/MainContainer/MainContainer'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Cards from './pages/Cards'
import Profile from './pages/Profile'

function App() {
  const { isExpanded, toggle } = useSidebar()

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar - apenas no desktop (≥1024px) */}
        <Sidebar isExpanded={isExpanded} onToggle={toggle} />

        {/* HeaderMobile - apenas em mobile/tablet (<1024px) */}
        <HeaderMobile />

        {/* Conteúdo principal */}
        <MainContainer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MainContainer>
      </div>
    </Router>
  )
}

export default App