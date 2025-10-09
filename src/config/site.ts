import chartAnimation from '@/assets/lotties/chart.json'
import moneyAnimation from '@/assets/lotties/money.json'
import noteAnimation from '@/assets/lotties/note.json'
import rocketAnimation from '@/assets/lotties/rocket.json'
import walletAnimation from '@/assets/lotties/wallet.json'

export const siteConfig = {
  title: 'Kharjino',
  description: 'Modern web, simplified for Web Developers',
  v: '1.0',
}

export const wizardData = [
  {
    title: 'همه‌چیز زیر کنترل توئه',
    description: 'درآمد و هزینه‌هاتو به ساده‌ترین شکل مدیریت کن.',
    lottie: walletAnimation, // 💰 حس کنترل و شروع
  },
  {
    title: 'مرتب مثل یه حرفه‌ای',
    description: 'تراکنش‌هاتو دسته‌بندی کن تا هیچ هزینه‌ای گم نشه.',
    lottie: moneyAnimation, // 🗂️ حس نظم و سازمان‌یافتگی
  },
  {
    title: 'ببین پولت کجا می‌ره',
    description: 'گزارش‌ها و نمودارهای ماهانه بهت دید دقیق می‌دن.',
    lottie: chartAnimation, // 📊 حس شفافیت و آگاهی
  },
  {
    title: 'هیچ‌چیز یادت نمیره',
    description: 'برای هر تراکنش یادداشت یا یادآور تنظیم کن.',
    lottie: noteAnimation, // 📝 حس راحتی و کنترل بیشتر
  },
  {
    title: 'وقتشه شروع کنی 💪',
    description: 'با ورود به حساب، مسیر مالی جدیدت رو شروع کن.',
    lottie: rocketAnimation, // 🔐 حس اعتماد و اقدام نهایی
  },
]
