import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12 lg:gap-16 xl:gap-[90px]">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-[90px] flex-grow">
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
                Дополнительная информация
              </h3>
              <ul className="flex flex-col gap-2 md:gap-3">
                <li>
                  <Link
                    href="/#contracts-type"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 pl-4 block"
                  >
                    Виды смарт-контрактов
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 pl-4 block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
              Социальные сети
            </h3>
            <ul className="flex flex-row gap-4 md:gap-6">
              <li>
                <Link href={"#"} className="opacity-70 hover:opacity-100 transition-opacity duration-200">
                  <Image src="/svg/social-media/instagram.svg" width={32} height={32} alt="Instagram" className="svg" />
                </Link>
              </li>
              <li>
                <Link href={"#"} className="opacity-70 hover:opacity-100 transition-opacity duration-200">
                  <Image src="/svg/social-media/facebook.svg" width={32} height={32} alt="Facebook" className="svg" />
                </Link>
              </li>
              <li>
                <Link href={"#"} className="opacity-70 hover:opacity-100 transition-opacity duration-200">
                  <Image src="/svg/social-media/telegram.svg" width={32} height={32} alt="Telegram" className="svg" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
