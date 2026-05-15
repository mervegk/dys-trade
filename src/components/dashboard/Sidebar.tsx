'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  NotePencilIcon,
  HouseIcon,
  CreditCardIcon,
  BuildingsIcon
} from "@phosphor-icons/react"
import Link from 'next/link';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { openTab } from "@/store/slices/tabSlice";

type Props = {}

export default function SidebarComp({ }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const items = [
    {
      title: "Ana Sayfa",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Başvurular",
      url: "/basvurular",
      icon: NotePencilIcon,
    },
    {
      title: "Ödemeler",
      url: "/odemeler",
      icon: CreditCardIcon,
    },
    {
      title: "Kurum Hakkında",
      url: "/kurum-hakkinda",
      icon: BuildingsIcon,
    },

  ]

  return (
    <aside>
      <Sidebar collapsible="offcanvas" className="min-h-content">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Yönetim Paneli</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton onClick={() => dispatch(openTab({
                      id: item.url,
                      title: item.title,
                      path: item.url
                    }))}>
                      <item.icon size={20} weight="regular" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  )
}