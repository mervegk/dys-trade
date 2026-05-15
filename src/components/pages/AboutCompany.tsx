import { useEffect } from 'react'
import Image from 'next/image'
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import companies from '../../../public/data/companies.json'

type Props = {}

export default function AboutCompany({ }: Props) {
  const activeCompany = useSelector(
    (state: RootState) => state.auth.activeCompany
  )
  console.log(activeCompany);


  const company = companies.companies.find(
    (company) => company.id === activeCompany
  )

  return (
    <>
      <ul>
        <li className='w-16 h-16'><img className='w-full object-cover object-center' src={company?.logo} alt='alt' /></li>
        <li>{company?.name}</li>
        <li>{company?.plan}</li>
      </ul>
    </>
  )
}
/*  useEffect(() => {

   const companyData = async () => {
     const res = await fetch(`/data/companies/${activeCompany}`)
     const data = await res.json();
     console.log(data)
   }
   if (activeCompany) {
     companyData()
   }
 }, [activeCompany]) */