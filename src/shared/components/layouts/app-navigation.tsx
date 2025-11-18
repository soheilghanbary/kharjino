'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NotesIcon,
  PieChartIcon,
  PlusCircleIcon,
  TransactionIcon,
  UserIcon,
} from '@/shared/assets/icons/bulk'
import { cn } from '@/shared/lib/utils'

const navItems = [
  {
    href: '/home',
    label: 'خانه',
    icon: PieChartIcon,
  },
  {
    href: '/transactions',
    label: 'تراکنش ها',
    icon: TransactionIcon,
  },
  {
    href: '/new',
    label: 'افزودن',
    icon: PlusCircleIcon,
  },
  {
    href: '/notes',
    label: 'دست نویس ها',
    icon: NotesIcon,
  },
  {
    href: '/profile',
    label: 'پروفایل',
    icon: UserIcon,
  },
]

const NavigationItem = ({ href, label, icon }: (typeof navItems)[0]) => {
  const pathname = usePathname()
  const active = pathname === href
  const IconComponent = icon

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center gap-1 text-[#919AAF] dark:text-muted-foreground/65',
        active && 'text-primary dark:text-heading'
      )}
    >
      <IconComponent className="size-6" />
      <p className="font-medium text-tiny/[16px]">{label}</p>
    </Link>
  )
}

export const AppNavigation = () => {
  return (
    <footer className="container-sm fixed inset-x-0 bottom-0 left-0 z-10 border-t bg-card/85 backdrop-blur-md">
      <section className="grid w-full grid-cols-5 gap-x-3 px-3 py-2.5">
        {navItems.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </section>
    </footer>
  )
}
