'use client'
import 'swiper/css'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '@/shared/components/ui/button'
import { wizardData } from '@/shared/config/site'
import { StepCard } from './step-card'

const SwiperPagination = ({
  activeIndex,
  onClick,
}: {
  activeIndex: number
  onClick: (index: number) => void
}) => {
  return (
    <div className="mx-auto my-8 flex items-center justify-center gap-2">
      {wizardData.map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onClick(idx)}
          className={`size-2 rounded-full transition-all duration-300 ${
            activeIndex === idx ? 'w-4 bg-primary/85' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  )
}

export default function StepSlider() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative mt-16 flex flex-col items-center">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
      >
        {wizardData.map((item, idx) => (
          <SwiperSlide key={idx}>
            <StepCard {...item} isActive={activeIndex === idx} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperPagination
        activeIndex={activeIndex}
        onClick={(idx) => swiperRef.current?.slideTo(idx)}
      />
      {activeIndex === wizardData.length - 1 && (
        <Button asChild className="w-full animate-duration-400 animate-fade-up">
          <Link href={'/login'}>ورود به حساب کاربری</Link>
        </Button>
      )}
    </div>
  )
}
