import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Err404 from "../component/Err404.jsx";
import SEO from "@americanexpress/react-seo";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Pagination = ({ games, itemsPerPage, handlePageClick }) => (
  <nav aria-label="page navigation">
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={Math.ceil(games.length / itemsPerPage)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={handlePageClick}
      previousClassName={
        "flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border rounded-l-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      }
      nextClassName={
        "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      }
      breakClassName={
        "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
      }
      pageClassName={
        "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:text-white"
      }
      containerClassName={
        "flex list-none my-5 justify-center -space-x-px text-base h-10"
      }
      activeClassName={
        "active dark:bg-gray-900 dark:border-gray-700 text-white bg-red-600"
      }
      disabledClassName={
        "text-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 bg-gray-500 bg-red-600"
      }
    />
  </nav>
);

const GameDetails = ({ game }) => (
  <div key={game.id} className="game-details">
    <div className="game-image">
      <Link to={`/detail/${game.id}`}>
        <img
          src={`https://assets.xtr.my.id/thumb/${game.id}.webp`}
          loading="lazy"
          alt={`Cover ${game.title}`}
          id="thumb"
          className="lg:w-auto lg:h-36 h-60"
          width="240"
          height="240"
        />
      </Link>
    </div>
    <div className="game-info">
      <div className="game-title">
        <Link
          className="mr-4 hover:underline md:mr-6 "
          to={`/detail/${game.id}`}
        >
          {game.title}
        </Link>
      </div>
      <p className="game-id">Game ID: {game.id}</p>
      <p className="game-console">Console: {game.console}</p>
      <p className="game-region">Region: {game.region}</p>
      <p className="game-size">Size: {game.size}</p>
    </div>
  </div>
);

const Consoles = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [console, setConsole] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNull, setIsNull] = useState(false);
  const [games, setGames] = useState([]);
  const { consoles } = useParams();
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.xtr.my.id/api/console/${consoles}`
      );
      setGames(response.data.games);
      if (consoles == "switch") {
        setConsole("Nintendo Switch");
      } else if (consoles == "vita"){
        setConsole("PS Vita");
      }
    } catch (error) {
      setIsNull(true);
      setConsole("Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (games.length === 0) {
      fetchData();
    }
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedGames = games.slice(offset, offset + itemsPerPage);

  return (
    <div id="content">
      {isNull ? (
        <Err404 />
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-2">
          <SEO
            title={`${console} | ROM Collection`}
            description={`Kumpulan ROM ${console} Dari XTR.`}
            keywords={[
              "XTR",
              "Switch",
              "PS Vita",
              "Game PS Vita",
              "Game Switch",
              "NSP",
              "XCI",
              "ROM Skyline",
              "ROM Yuzu",
            ]}
            siteUrl="https://xtr.my.id"
            image={{
              src: "http://xtr.my.id/vite.svg",
            }}
            locale="id-ID"
          />
          <div className="col-span-3 lg:col-span-2 mb-3">
            {paginatedGames.map((game) => (
              <GameDetails game={game} />
            ))}
            {games.length > itemsPerPage && (
              <Pagination
                games={games}
                itemsPerPage={itemsPerPage}
                handlePageClick={handlePageClick}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Consoles;
