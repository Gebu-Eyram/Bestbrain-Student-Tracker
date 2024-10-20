import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="dark bg-black">
      <footer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-mb-0.5 w-full"
          viewBox="0 0 1367.743 181.155"
        >
          <path
            className="fill-current text-gray-100 dark:text-gray-900/60"
            id="wave"
            data-name="wave"
            d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
            transform="translate(1.743 66.155)"
          ></path>
        </svg>
        <div className="bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900/60 dark:to-transparent pt-1">
          <div className="container m-auto space-y-8 px-6 text-gray-600 dark:text-gray-400 md:px-12 lg:px-20">
            <div className="grid grid-cols-8 gap-6 md:gap-0">
              <div className="col-span-8 border-r  dark:border-gray-800 md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between gap-6 border-b border-white dark:border-gray-800 py-6 md:block md:space-y-6 md:border-none md:py-8">
                  <Image
                    src="/bb-logo.svg"
                    alt="logo tailus"
                    width="100"
                    height="42"
                    className="w-24 h-10"
                  />
                  <p className="text-sm text-muted-foreground dark:text-gray-400 max-w-60">
                    Best Student Tracker is a platform that helps schools manage
                    their data and improve their students' performance.
                  </p>
                </div>
              </div>
              <div className="col-span-8 md:col-span-6 lg:col-span-5">
                <div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 md:pl-16">
                  <div className="min-h-fit flex justify-start h-full flex-col ">
                    <h6 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Company
                    </h6>
                    <ul className="mt-4 flex flex-col list-inside space-y-4">
                      <li>
                        <Link
                          href="https://www.bestbrainexams.com/about"
                          className="transition hover:text-blue-600"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.bestbrainexams.com/services"
                          className="transition hover:text-blue-600"
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.bestbrainexams.com/resources"
                          className="transition hover:text-blue-600"
                        >
                          Resources
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.bestbrainexams.com/contact-us"
                          className="transition hover:text-blue-600"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="min-h-fit flex justify-start h-full flex-col ">
                    <h6 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Navigation
                    </h6>
                    <ul className="mt-4 flex flex-col list-inside space-y-4">
                      <li>
                        <Link
                          href="#home"
                          className="transition hover:text-blue-600"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#features"
                          className="transition hover:text-blue-600"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#testimonials"
                          className="transition hover:text-blue-600"
                        >
                          Testimonials
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#pricing"
                          className="transition hover:text-blue-600"
                        >
                          Pricing
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between border-t  dark:border-gray-800 py-4 pb-8 md:pl-16">
                  <span>Copyright © 2024</span>
                  <span>All right reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
