import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import SidebarComp from './Sidebar'
import Header from './Header'

type Props = {}

export default function Index({ }: Props) {
  return (
    <div className='flex'>
      <SidebarProvider>
        <SidebarComp />
        <div className='w-full'>
          <Header />
          <div className='mt-4'>

          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}