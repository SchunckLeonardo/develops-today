import { FormComponent } from '@/components/form-component'
import { Lilita_One } from 'next/font/google'

const LilitaOne = Lilita_One({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className="flex w-full flex-1 items-center justify-center px-5">
        <section className="flex w-full items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className={`${LilitaOne.className} text-4xl capitalize`}>
              Find your best car
            </h2>
            <p className="text-center text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, veniam!
            </p>
            <FormComponent />
          </div>
        </section>
      </main>
    </>
  )
}
