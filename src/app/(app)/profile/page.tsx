import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { MagicIcon, NotesIcon, UserIcon, UsersIcon } from '@/assets/icons/bulk'
import { DonateLink } from '@/components/common/donate-link'
import { LogoutButton } from '@/components/common/logout-button'
import { AppHeader } from '@/components/layouts/app-header'

const links = [
  {
    href: '/account',
    title: 'ویرایش حساب کاربری',
    icon: UserIcon,
  },
  {
    href: '/notes',
    title: 'دست نویس های من',
    icon: NotesIcon,
  },
  {
    href: '/theme',
    title: 'تم اپلیکیشن',
    icon: MagicIcon,
  },
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
      <div className="fade-up-transition flex flex-col gap-2">
        {links.map((l, i) => (
          <Link
            key={i}
            href={l.href}
            className="flex h-12 items-center gap-3 rounded-lg bg-muted p-3 duration-150 dark:bg-card"
          >
            <l.icon className="size-5 text-muted-foreground/80" />
            <span className="grow text-right text-sm/[18px]">{l.title}</span>
            <ChevronLeft className="size-5 text-muted-foreground" />
          </Link>
        ))}
        <hr className="my-2" />
        <LogoutButton />
        <hr className="my-4" />
        <DonateLink />
      </div>
    </Fragment>
  )
}
