import React from 'react'
import Login from '@/components/Login'

type Props = {}

export default function page({ }: Props) {
  return (
    <section className=' p-4 h-screen flex items-center justify-center bg-zinc-100'>
      <Login />
    </section>
  )
}