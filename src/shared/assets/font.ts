import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: './fonts/IRANYekanX-Light.woff2',
      weight: '300',
    },
    {
      path: './fonts/IRANYekanX-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/IRANYekanX-Medium.woff2',
      weight: '500',
    },
    {
      path: './fonts/IRANYekanX-DemiBold.woff2',
      weight: '600',
    },
    {
      path: './fonts/IRANYekanX-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})

// export const font = localFont({
//   src: [
//     {
//       path: './fonts/yekanbakh/YekanBakhFaNum-Light.woff2',
//       weight: '300',
//     },
//     {
//       path: './fonts/yekanbakh/YekanBakhFaNum-Regular.woff2',
//       weight: '400',
//     },
//     {
//       path: './fonts/yekanbakh/YekanBakhFaNum-Regular.woff2',
//       weight: '500',
//     },
//     {
//       path: './fonts/yekanbakh/YekanBakhFaNum-SemiBold.woff2',
//       weight: '600',
//     },
//     {
//       path: './fonts/yekanbakh/YekanBakhFaNum-Bold.woff2',
//       weight: '700',
//     },
//   ],
//   display: 'swap',
//   variable: '--font-sans',
//   preload: true,
// })
