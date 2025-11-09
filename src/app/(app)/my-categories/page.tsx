import Link from 'next/link'
import { Fragment } from 'react/jsx-runtime'
import { PlusIcon } from '@/shared/assets/icons/bulk'
import { AppHeader } from '@/shared/components/layouts/app-header'
import { Button } from '@/shared/components/ui/button'
import { CategoryList } from './components/category-list'

export default function MyCategories() {
  return (
    <Fragment>
      <AppHeader title="دسته بندی های من" />
      <section className="fade-up-transition grid gap-4">
        <Button size={'sm'} asChild className="w-fit">
          <Link href={'/my-categories/new'}>
            <PlusIcon />
            افزودن دسته بندی
          </Link>
        </Button>
        <CategoryList />
      </section>
    </Fragment>
  )
}
