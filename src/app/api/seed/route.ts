export const initial = [
  // ---- Income ----
  { name: 'حقوق ماهیانه', icon: '💰', type: 'income' },
  { name: 'پاداش / اضافه‌کار', icon: '🎯', type: 'income' },
  { name: 'درآمد فریلنسری', icon: '💻', type: 'income' },
  { name: 'سود بانکی / سرمایه‌گذاری', icon: '🏦', type: 'income' },
  { name: 'فروش محصول', icon: '🛍️', type: 'income' },
  { name: 'هدیه / کمک مالی', icon: '🎁', type: 'income' },
  { name: 'بازپرداخت قرض', icon: '🔄', type: 'income' },
  { name: 'درآمد اجاره', icon: '🏠', type: 'income' },
  { name: 'سایر درآمدها', icon: '📈', type: 'income' },

  // ---- Expense ----
  { name: 'خوراک و مواد غذایی', icon: '🍽️', type: 'expense' },
  { name: 'حمل‌ونقل', icon: '🚌', type: 'expense' },
  { name: 'اجاره منزل', icon: '🏡', type: 'expense' },
  { name: 'قبوض (آب، برق، گاز، اینترنت)', icon: '💡', type: 'expense' },
  { name: 'پوشاک', icon: '👕', type: 'expense' },
  { name: 'سلامت و دارو', icon: '💊', type: 'expense' },
  { name: 'تفریح و سرگرمی', icon: '🎮', type: 'expense' },
  { name: 'رستوران / کافی‌شاپ', icon: '☕', type: 'expense' },
  { name: 'آموزش و کتاب', icon: '📚', type: 'expense' },
  { name: 'لوازم منزل', icon: '🧹', type: 'expense' },
  { name: 'سفر', icon: '✈️', type: 'expense' },
  { name: 'مالیات', icon: '💸', type: 'expense' },
  { name: 'بیمه', icon: '🛡️', type: 'expense' },
  { name: 'قرض یا اقساط', icon: '💳', type: 'expense' },
  { name: 'هدیه / کمک به دیگران', icon: '🎉', type: 'expense' },
  { name: 'سایر هزینه‌ها', icon: '🧾', type: 'expense' },
]

export async function GET() {
  return new Response('Hello World!')
}
