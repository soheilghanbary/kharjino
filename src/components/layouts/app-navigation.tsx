'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  PieChartIcon,
  PlusIcon,
  TransactionIcon,
  UserIcon,
} from '@/assets/icons/bulk'
import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '/home',
    label: 'خانه',
    icon: PieChartIcon,
  },
  {
    href: '/new',
    label: 'افزودن ',
    icon: PlusIcon,
  },
  {
    href: '/transactions',
    label: 'تراکنش ها',
    icon: TransactionIcon,
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
      <p className="font-medium text-xs/[16px]">{label}</p>
    </Link>
  )
}

export const AppNavigation = () => {
  return (
    <footer className="container-sm fixed inset-x-0 bottom-0 left-0 z-10 border-t bg-card/85 backdrop-blur-md">
      <section className="grid w-full grid-cols-4 gap-6 px-3 py-2.5">
        {navItems.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </section>
    </footer>
  )
}
