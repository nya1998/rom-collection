import { Helmet, HelmetProvider } from "react-helmet-async";

export default function err404() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Not Found | ROM Collection</title>
        </Helmet>
      </HelmetProvider>
      <div className="lg:mx-5">
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 cursor-default">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-dark mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-primary-500 text-red-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl dark:text-white text-red-600">
                Page Not Found.
              </p>
              <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
                Maaf, kami tidak menemukan halaman yang anda cari.
              </p>
              <a
                href="/"
                className="inline-flex text-white bg-blue-500 dark:bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
