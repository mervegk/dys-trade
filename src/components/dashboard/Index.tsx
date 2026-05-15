'use client'
import { SidebarProvider } from '../ui/sidebar'
import SidebarComp from './Sidebar'
import Header from './Header'
import TabBar from './TabBar'
import TabContent from './TabContent'
import HeaderTop from './HeaderTop'

type Props = {}

export default function Index({ }: Props) {
  return (
    <div className='flex h-full'>
      <SidebarProvider>
        <SidebarComp />
        <div className='w-full'>
          <HeaderTop />
          <Header />
          <TabBar />
          <div className='bg-zinc-100 h-full'>
            <TabContent />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}