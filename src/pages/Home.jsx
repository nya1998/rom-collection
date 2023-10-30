import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.xtr.my.id/api/list"
        );
        setGames(response.data.games);
      } catch (error) {
          return;
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
    <div className="grid grid-cols-3 gap-4 mb-2">
      <HelmetProvider>
        <Helmet>
          <title>ROM Collection</title>
        </Helmet>
      </HelmetProvider>
      <div className="col-span-3 lg:col-span-2 mb-3">
        {paginatedGames.map((game) => (
          <div
            key={game.id}
            className="bg-white w-full p-3 lg:max-w-full lg:flex mt-5 transform hover:-translate-y-1 hover:shadow-md duration-500 dark:bg-warmgray-900"
          >
            <div className="flex justify-center items-center">
              <Link
                to={`/detail/${game.id}`} //object-cover w-full rounded-t-lg h-36 md:h-auto md:w-32 md:rounded-none md:rounded-l-lg
              >
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
        ))}
        {renderPagination}
      </div>
    </div>
  );
};

export default Home;
