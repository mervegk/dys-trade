'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import companies from '../../../public/data/companies.json'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setAuth } from "@/store/slices/authSlice"

export default function HeaderTop() {
  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => state.auth)

  const handleChange = (value: string) => {
    dispatch(
      setAuth({
        user: auth.user,
        permissions: auth.permissions,
        activeCompany: value
      })
    )
  }

  return (
    <section className='bg-zinc-300'>
      <Select
        value={auth.activeCompany}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Şirket seç" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {companies.companies.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}