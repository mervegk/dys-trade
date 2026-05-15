'use client'
import { SidebarProvider } from '../ui/sidebar'
import SidebarComp from './Sidebar'
import Header from './Header'
import TabBar from './TabBar'
import TabContent from './TabContent'

type Props = {}

export default function Index({ }: Props) {
  return (
    <div className='flex'>
      <SidebarProvider>
        <SidebarComp />
        <div className='w-full'>
          <Header />
          <TabBar />
          <div className='mt-4'>
            <TabContent />
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}