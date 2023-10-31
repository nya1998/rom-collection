import { Helmet, HelmetProvider } from "react-helmet-async";
import { Store } from "react-notifications-component";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ReactiveButton from "reactive-button";
import Err404 from "../component/Err404.jsx";
import SEO from "@americanexpress/react-seo";
import { useParams } from "react-router-dom";
import { FcCalendar } from "react-icons/fc";
import ReactMarkdown from "react-markdown";
import { IoMdEye, IoMdDownload } from "react-icons/io";
import TimeAgo from "react-timeago";
import axios from "axios";

export default function Detail() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState({});
  const [state, setState] = useState("idle");
  const [flexStat, setFlexStat] = useState("");
  const [isNull, setIsNull] = useState(false);
  const [linkList, setLinkList] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.xtr.my.id/api/detail/${id}`)
      .then((response) => {
        setPosts(response.data);
        setTitle(response.data.title);
      })
      .catch((error) => {
        setIsNull(true);
      });
  }, [id]);

  const handleRecaptcha = (value) => {
    setRecaptchaToken(value);
  };

  const createButton = (color, text, link, margin) => (
      <ReactiveButton
        idleText={
          <span className="flex items-center text-xs text-white">
            <IoMdDownload className={`h-4 w-4 ${margin}`} />
            {text}
          </span>
        }
        animation={false}
        buttonState={state}
        onClick={() => window.open(link, "_blank")}
        color={color}
        size={"small"}
        width={"115"}
      />
  );

  const handleLinkList = (data) => {
    if (!data.update && !data.dlc) {
      setLinkList(createButton("green", "BASE", data.base, "mr-4"));
    } else if (!data.dlc) {
      setLinkList(
        <>
          {createButton("green", "BASE", data.base, "mr-4")}
          {createButton("red", "UPDATE", data.update, "m-2")}
        </>
      );
    } else {
      setLinkList(
        <>
          {createButton("green", "BASE", data.base, "mr-4")}
          {createButton("red", "UPDATE", data.update, "mr-2")}
          {createButton("blue", "DLC", data.dlc, "mr-5")}
        </>
      );
    }
    setFlexStat("flex");
  };

  const handleErr = (msg) => {
    Store.addNotification({
      title: "Error",
      message: msg,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3500,
        onScreen: true,
      },
    });
  };

  const dlClicked = () => {
    setState("loading");
    setTimeout(async () => {
      const token = recaptchaToken;
      if (token) {
        const payload = { id: id, recaptcha: token };
        axios
          .post("https://api.xtr.my.id/api/chk/", payload)
          .then((resp) => {
            handleLinkList(resp.data);
          })
          .catch((error) => {
            const msg = "Selesaikan Captcha untuk melihat link.";
            handleErr(msg);
          });
      } else {
        const msg = "Selesaikan Captcha untuk melihat link.";
        handleErr(msg);
        setState("idle");
      }
    }, 2000);
  };

  return (
    <div id="content">
      {isNull ? (
        <Err404 />
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="col-span-3 lg:col-span-2 dark:text-white">
            <HelmetProvider>
              <Helmet>
                <title>
                  {title ? `${title} | ROM Collection` : "ROM Collection"}
                </title>
              </Helmet>
            </HelmetProvider>
            <SEO
              title={title ? `${title} | ROM Collection` : "ROM Collection"}
              description={`ROM Dari Game ${title} Tersedia di XTR!`}
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
                `${title}`,
              ]}
              siteUrl={`https://xtr.my.id/detail/${id}`}
              image={{
                src: `https://assets.xtr.my.id/img/${id}.webp`,
              }}
              locale="id-ID"
            />
            <div
              id="content"
              className="bg-white dark:bg-warmgray-900 p-5 my-4"
            >
              <h1 className="mb-2 text-2xl font-bold">{posts.title}</h1>
              <aside>
                <div className="inline-flex items-center text-sm">
                  <FcCalendar className="mr-1" />
                  <TimeAgo date={posts.createdAt} />
                </div>
                <div className="flex justify-center py-4">
                  <img
                    src={`https://assets.xtr.my.id/img/${id}.webp`}
                    alt={posts.title}
                    className="lg:w-auto lg:h-80"
                  />
                </div>
              </aside>
              <div className="prose md:prose-lg lg:prose-xl max-w-none dark:prose-invert mt-5">
                <h2 className="mb-2">Link</h2>
                <div id="linkList" className={flexStat}>
                  {linkList ? (
                    linkList
                  ) : (
                    <>
                      <ReCAPTCHA
                        theme="dark"
                        onChange={handleRecaptcha}
                        sitekey="6Lczl-slAAAAANxvawAfza4bKMOCPbTeXgzCRcYW"
                        className="mb-2"
                      />
                      <ReactiveButton
                        idleText={
                          <span className="flex items-center">
                            <IoMdEye className="h-4 w-5 mr-1" />
                            Show Link
                          </span>
                        }
                        animation={false}
                        buttonState={state}
                        onClick={dlClicked}
                        color={"green"}
                        size="small"
                        width={"115"}
                      />
                    </>
                  )}
                </div>

                <ReactMarkdown>## Sinopsis</ReactMarkdown>
                <ReactMarkdown>{posts.synop}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
