import { Helmet, HelmetProvider } from "react-helmet-async";
import { Store } from "react-notifications-component";
import React, { useState, useEffect } from "react";
import Err404 from "../component/Err404.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import ReactiveButton from "reactive-button";
import { useParams } from "react-router-dom";
import { FcCalendar } from "react-icons/fc";
import ReactMarkdown from "react-markdown";
import { IoMdEye } from "react-icons/io";
import TimeAgo from "react-timeago";
import axios from "axios";

export default function Detail() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState({});
  const [state, setState] = useState("idle");
  const [isNull, setIsNull] = useState(false);
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

  const dlClicked = () => {
    setState("loading");
    setTimeout(async () => {
      const linkListDiv = document.getElementById("linkList");
      const token = recaptchaToken;
      if (linkListDiv && token) {
        const payload = { id: id, recaptcha: token };
        axios
          .post("https://api.xtr.my.id/api/chk/", payload)
          .then((resp) => {
            const data = resp.data;
            if (!data.update && !data.dlc) {
              linkListDiv.innerHTML = `<button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-green-700 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-green-800" onclick=" window.open('${data.base}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>BASE</span></button>`;
              linkListDiv.classList.add("flex");
              setState("success");
            } else if (!data.dlc) {
              linkListDiv.innerHTML = `<button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-green-700 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-green-800" onclick=" window.open('${data.base}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>BASE</span></button> <button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-red-700 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-red-800" onclick=" window.open('${data.update}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>UPDATE</span></button>`;
              linkListDiv.classList.add("flex");
              setState("success");
            } else {
              linkListDiv.innerHTML = `<button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-green-700 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-green-800" onclick=" window.open('${data.base}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>BASE</span></button> <button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-red-700 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-red-800" onclick=" window.open('${data.update}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>UPDATE</span></button><br><button class="focus:shadow-outline m-2 flex h-6 w-24 items-center rounded-lg bg-yellow-600 px-3 text-xs text-white no-underline transition-colors duration-150 hover:bg-yellow-800" onclick=" window.open('${data.dlc}','_blank')"><svg class="mr-3 h-3 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path></svg><span>DLC</span></button>`;
              linkListDiv.classList.add("flex");
              setState("success");
            }
          })
          .catch((error) => {
            Store.addNotification({
              title: "Error",
              message:
                "Captcha yang anda masukkan sepertinya tidak valid. Muat ulang halaman ini.",
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
          });
      } else {
        Store.addNotification({
          title: "Error",
          message: "Selesaikan Captcha untuk melihat link.",
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
                <div id="linkList" className="">
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
