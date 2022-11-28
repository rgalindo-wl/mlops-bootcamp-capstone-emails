import { type NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
         <title>Capstone Project | Team 7 | MLOps Bootcamp</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Email <span className="text-[#cc66ff]">Sentiment</span> Analysis
          </h1>
          {/* relative before-content-[0] before:bg-white before:absolute before:w-[100%] before:h-[100%] before:rounded-2xl before:z-0 */}
          <div className="bg-white flex flex-col min-h-[50vh] min-w-[50vw] max-w-[60rem] rounded-2xl shadow-2xl overflow-hidden">
            <div id="top-actions-box" className="flex justify-end gap-1 p-3">
              <div className="p-1 hover:bg-gray-200 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 fill-purple-400">
                  <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                </svg>
              </div>

              <div className="p-1 hover:bg-gray-200 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 fill-purple-400">
                  <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z" />
                </svg>
              </div>

              <div className="p-1 hover:bg-gray-200 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 fill-purple-400">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </div>
            </div>
            <form name="email" className="flex flex-col flex-grow">
              <div className="flex flex-col h-full px-6 flex-grow">
                <div id="from-box" className="flex flex-grow-0 border-b-2 py-3 pt-0 gap-2">
                  <label htmlFor="from-input" className="text-gray-500">From:</label>
                  <input className="text-gray-800 bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="email" name="from-input" id="from-input" />
                </div>
                <div id="to-box" className="flex flex-grow-0 border-b-2 py-3 gap-2">
                  <label htmlFor="to-input" className="text-gray-500">To:</label>
                  <input className="text-gray-800 bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="email" name="to-input" id="to-input" />
                </div>
                <div id="subject-box" className="flex-grow-0 border-b-2 py-3 gap-2">
                  <input className="font-medium bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="text" name="subject-input" id="subject-input" placeholder="Subject" />
                </div>
                <textarea className="grow py-3 text-gray-800 bg-white outline-none resize-none" placeholder="Write your email">
                  hola
                </textarea>
              </div>
              <div className="flex-grow-0 gap-5 flex justify-end w-full bg-gray-200 p-5 py-4 items-center">
                <div className="grow grid grid-cols-12">
                  <div className="col-span-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 stroke-green-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                  </div>
                  <div className="col-span-4 text-gray-600 text-lg flex items-center">
                    Overwhelmingly positive
                  </div>
                  <div className="grid grid-cols-12 relative gap-1 col-span-7 content-center">
                    <div className="col-span-2 bg-red-400 min-h-[1px] h-[1rem] rounded-md" />
                    <div className="col-span-4 bg-yellow-400 min-h-[1px] h-[1rem] rounded-md" />
                    <div className="col-span-6 bg-green-400 min-h-[1px] h-[1rem] rounded-md" />
                  </div>
                </div>
                <input form="email" type="submit" value="Send now" className="bg-purple-400 cursor-pointer px-4 py-2 text-white text-md font-medium rounded-md flex-grow-0" />
              </div>
            </form>
          </div>
          <div className="text-white text-4xl font-bold">
            Result
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
