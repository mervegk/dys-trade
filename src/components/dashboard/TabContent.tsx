'use client'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import Applications from '../pages/Applications'
import Payments from '../pages/Payments'
import AboutCompany from '../pages/AboutCompany'

const pageMap: Record<string, React.ReactNode> = {
  '/': '/',
  '/basvurular': <Applications />,
  '/odemeler': <Payments />,
  '/kurum-hakkinda': <AboutCompany />,
}

export default function TabContent() {
  const { tabs, activeTabId } = useSelector((state: RootState) => state.tabs)

  if (tabs.length === 0) return;

  return (
    <>
      {tabs.map(tab => (
        <section key={tab.id} className={`h-full ${tab.id === activeTabId ? 'block' : 'hidden'}`}>
          {pageMap[tab.path] ?? <div className='p-4'>Sayfa bulunamadı</div>}
        </section>
      ))}
    </>
  )
}