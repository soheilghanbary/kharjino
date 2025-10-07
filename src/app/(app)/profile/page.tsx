import { ArrowLeftIcon, MagnetIcon, User2Icon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'

const links = [
  {
    href: '/account',
    title: 'ویرایش حساب کاربری',
    icon: User2Icon,
  },
  // {
  //   href: '/profile/currency',
  //   title: 'انتخاب واحد پول',
  //   icon: MoneyIcon,
  // },
  {
    href: '/theme',
    title: 'تم اپلیکیشن',
    icon: MagnetIcon,
  },
  // {
  //   href: '/support',
  //   title: 'پشتیبانی',
  //   icon: HeadphoneIcon,
  // },
  {
    href: '/about',
    title: 'درباره ما',
    icon: UsersIcon,
  },
]

export default function ProfilePage() {
  return (
    <Fragment>
      <AppHeader title="پروفایل" />
      <div className="flex flex-col gap-2">
        {links.map((l, i) => (
          <Link
            key={i}
            href={l.href}
            className="flex h-12 items-center gap-3 rounded-lg border bg-card p-3 duration-150"
          >
            <l.icon className="size-6" />
            <span className="grow text-right text-sm/[18px]">{l.title}</span>
            <ArrowLeftIcon className="size-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </Fragment>
  )
}
