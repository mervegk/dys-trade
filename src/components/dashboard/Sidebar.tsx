'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
  LayoutIcon,
  UsersIcon,
  PackageIcon,
  GearIcon,
  CaretDownIcon
} from "@phosphor-icons/react"

type Props = {}

export default function SidebarComp({ }: Props) {

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutIcon,
    },
    {
      title: "Ürünler",
      url: "/products",
      icon: PackageIcon,
    },
    {
      title: "Müşteriler",
      url: "/customers",
      icon: UsersIcon,
    },
    {
      title: "Ayarlar",
      url: "/settings",
      icon: GearIcon,
    },
  ]
  return (
    <aside>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Yönetim Paneli</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon size={20} weight="regular" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </aside>
  )
}