import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Err404 from "../component/Err404.jsx";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Consoles = () => {
  const [gridSize, setGridSize] = useState("grid grid-cols-3 gap-4 mb-2");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [games, setGames] = useState([]);
  const { setCons, cons } = useState("");
  const { consoles } = useParams();
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/console/${consoles}`
        );
        setGames(response.data.games);
      } catch (error) {
        setIsNull(true);
        setGridSize("");
      } finally {
        setLoading(false);
      }
    };

    if (games.length === 0) {
      fetchData();
    }
  }, [games]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedGames = games.slice(offset, offset + itemsPerPage);
  const renderPagination =
    games.length > itemsPerPage ? (
      <nav aria-label="page navigation">
        <ReactPaginate
          previousLabel={"<"}
          previousClassName={
            "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border rounded-l-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          }
          nextLabel={">"}
          nextClassName={
            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          }
          breakLabel={"..."}
          breakClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400"
          pageClassName={
            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400"
          }
          pageCount={Math.ceil(games.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex list-none my-5 justify-center -space-x-px text-base h-10"
          }
          activeClassName={
            "active dark:bg-gray-900 dark:border-gray-700 text-white bg-red-400"
          }
          disabledClassName={
            "active bg-red-400 text-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 bg-gray-500 cursor-default"
          }
        />
      </nav>
    ) : null;

  return (
    <div className={gridSize}>
      <div className="col-span-3 lg:col-span-2 mb-3">
        {isNull ? (
          <div className="lg:mx-5">
            <HelmetProvider>
              <Helmet>
                <title>Not Found | ROM Collection</title>
              </Helmet>
            </HelmetProvider>
            <section>
              <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 cursor-default">
                <div className="mx-auto max-w-screen-sm text-center">
                  <h1 className="text-dark mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-primary-500 text-red-500">
                    404
                  </h1>
                  <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl dark:text-white text-red-600">
                    No results found.
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
                    Maaf, game yang kamu cari belum tersedia. Coba cari dengan
                    kata kunci lain, atau gunakan Title ID dari game yang sedang
                    kamu cari. Jika game masih tetap belum ada, kamu bisa
                    meminta kami untuk memasukan game tersebut.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          paginatedGames.map((game) => (
            <div
              key={game.id}
              className="bg-white w-full p-3 lg:max-w-full lg:flex mt-5 transform hover:-translate-y-1 hover:shadow-md duration-500 dark:bg-warmgray-900"
            >
              <HelmetProvider>
                <Helmet>
                  <title>{game.console} | ROM Collection</title>
                </Helmet>
              </HelmetProvider>
              <div className="flex justify-center items-center">
                <Link to={`/detail/${game.id}`}>
                  <img
                    src={`https://assets.xtr.my.id/img/${game.id}.webp`}
                    loading="lazy"
                    alt={`Cover ${game.title}`}
                    id="thumb"
                    className="lg:w-auto lg:h-36 h-60"
                  />
                </Link>
              </div>
              <div className="relative pl-4 p-2 justify-between leading-normal max-w-full w-full">
                <div className="text-gray-900 font-bold text-xl mb-2 dark:text-white">
                  <Link
                    className="mr-4 hover:underline md:mr-6 "
                    to={`/detail/${game.id}`}
                  >
                    {game.title}
                  </Link>
                </div>
                <p className="text-gray-700 text-base pb-0.5 dark:text-gray-300 cursor-default">
                  Game ID: {game.id}
                </p>
                <p className="text-gray-700 text-base pb-0.5 dark:text-gray-300 cursor-default">
                  Console: {game.console}
                </p>
                <p className="text-gray-700 text-base pb-0.5 dark:text-gray-300 cursor-default">
                  Region: {game.region}
                </p>
                <p className="text-gray-700 text-base pb-0.5 dark:text-gray-300 cursor-default">
                  Size: {game.size}
                </p>
              </div>
            </div>
          ))
        )}
        {renderPagination}
      </div>
    </div>
  );
};

export default Consoles;
