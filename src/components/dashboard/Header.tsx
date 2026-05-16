'use client'
import { useSession } from 'next-auth/react'
import { SidebarInset, SidebarTrigger } from '../ui/sidebar'
import { GearIcon, BellIcon, UserIcon } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { SignOutIcon } from '@phosphor-icons/react'

type Props = {}

export default function Header({ }: Props) {
  const { data: session } = useSession();

  return (
    <div className='flex-1 pr-2 xl:pr-4'>
      <SidebarInset>
        <div className='flex gap-4 items-center justify-between py-2'>
          <div className='flex gap-2 items-center'>
            <SidebarTrigger size='icon-lg' />
            <div>{session?.user.name}</div>
          </div>
          <div className='grid grid-cols-3 gap-2 text-2xl'>
            <div className='cursor-pointer hover:bg-muted p-1 rounded-md'><GearIcon /></div>
            <div className='cursor-pointer hover:bg-muted p-1 rounded-md'><BellIcon /></div>
            <button className='cursor-pointer hover:bg-muted p-1 rounded-md' title='Çıkış Yap'
              onClick={() => signOut()}
            ><SignOutIcon /></button>
            {/* <div className='cursor-pointer hover:bg-muted p-1 rounded-md'><UserIcon /></div> */}
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}