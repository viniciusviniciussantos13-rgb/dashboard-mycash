import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FinanceProvider } from './contexts/FinanceContext'
import { AuthProvider } from './contexts/AuthContext'
import { MobileFiltersProvider, useMobileFilters } from './contexts/MobileFiltersContext'
import { useSidebar } from './hooks/useSidebar'
import Sidebar from './components/layout/Sidebar/Sidebar'
import HeaderMobile from './components/layout/HeaderMobile/HeaderMobile'
import MainContainer from './components/layout/MainContainer/MainContainer'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Cards from './pages/Cards'
import Profile from './pages/Profile'
import MobileFiltersModal from './components/modals/MobileFiltersModal'

function App() {
  const { isExpanded, toggle } = useSidebar()

  return (
    <AuthProvider>
      <FinanceProvider>
      <MobileFiltersProvider>
        <FiltersModalLayer />
        <Router>
          <div className="flex min-h-screen">
            <Sidebar isExpanded={isExpanded} onToggle={toggle} />
            <HeaderMobile />
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
      </MobileFiltersProvider>
      </FinanceProvider>
    </AuthProvider>
  )
}

function FiltersModalLayer() {
  const { isOpen, close } = useMobileFilters()
  return <MobileFiltersModal open={isOpen} onClose={close} />
}

export default App