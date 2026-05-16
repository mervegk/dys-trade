import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  src?: string;
  companyName?: string;
}

export default function PDFViewer({ src, companyName }: Props) {
  return (
    <Dialog>
      <DialogTrigger>Sözleşmeyi Görüntüle</DialogTrigger>
      <DialogContent className="max-w-4xl!">
        <DialogHeader>
          <DialogTitle>{companyName} ile Yapılan Sözleşme</DialogTitle>
          <DialogDescription>
            <iframe src={src} className='w-full h-200 rounded-xl border'></iframe>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}