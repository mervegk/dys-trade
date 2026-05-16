import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import companies from '../../../public/data/companies.json'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { title } from "process"

type Props = {}

export default function AboutCompany({ }: Props) {
  const activeCompany = useSelector(
    (state: RootState) => state.auth.activeCompany
  )

  const company = companies.companies.find(
    (company) => company.id === activeCompany
  )

  const listItems = [
    { title: 'Şirket Adı', content: company?.name },
    { title: 'Komisyon Tutarı', content: '%' + company?.commission },
    {
      title: 'Sözleşme', content: <Dialog>
        <DialogTrigger className="cursor-pointer text-blue-500 text-start hover:underline">Görüntüle</DialogTrigger>
        <DialogContent className="max-w-4xl!">
          <DialogHeader>
            <DialogTitle className="mb-2 text-xl"><span className="text-destructive">{company?.name}</span> Sözleşmesi</DialogTitle>
            <DialogDescription>
              <iframe src={company?.contract} className='w-full h-100 lg:h-200 rounded-xl border'></iframe>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    }
  ]

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className='w-32 h-32 mt-4 mb-8 border border-zinc-300 rounded-lg p-1'>
        <img className='w-full object-cover object-center' src={company?.logo} alt='alt' />
      </div>
      <ul className="w-full px-4 grid grid-cols-1 gap-4 justify-between">
        {
          listItems.map((item, idx) => <li key={idx} className="grid grid-cols-2 gap-1 md:gap-2 text-base md:text-xl border-b border-b-zinc-200"><span className="font-bold">{item.title}:</span>  {item.content}</li>)
        }
      </ul>
    </div>
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