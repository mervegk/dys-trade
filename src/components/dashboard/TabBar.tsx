'use client'
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, switchTab } from '@/store/slices/tabSlice';
import { XIcon } from '@phosphor-icons/react';
import { cn } from "@/lib/utils"
import { Tab } from '@/store/slices/tabSlice';
import { RootState } from '@/store/store';

export default function TabBar() {
  const dispatch = useDispatch()
  const { tabs, activeTabId } = useSelector((state: RootState) => state.tabs)

  return (
    <div className="flex border-b overflow-x-auto">
      {tabs.map((tab: Tab) => (
        <div
          key={tab.id}
          className={cn(
            "flex items-center gap-2 px-4 py-2 border-r cursor-pointer text-sm shrink-0",
            activeTabId === tab.id
              ? "bg-background border-b-2 border-b-primary"
              : "bg-muted text-muted-foreground hover:bg-background"
          )}
          onClick={() => dispatch(switchTab(tab.id))}
        >
          {tab.title}
          <XIcon
            className="h-3 w-3 hover:text-destructive"
            onClick={e => {
              e.stopPropagation()
              dispatch(closeTab(tab.id))
            }}
          />
        </div>
      ))}

    </div>
  )
}