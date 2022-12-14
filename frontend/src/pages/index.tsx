import { type NextPage } from "next";
import Head from "next/head";
import { useState } from 'react';

interface AnalysisResult {
  neg: number;
  neu: number;
  pos: number;
  compound: number;
}

type Color = 'red' | 'yellow' | 'green' | 'gray';

const texts = {
  op: 'Overwhelmingly positive',
  vp: 'Very positive',
  p: 'Positive',
  sp: 'Slightly positive',
  nr: 'Neutral',
  nv: 'Negative',
  m: 'Very mixed',
}

const Home: NextPage = () => {
  const [from_, setFrom] = useState('');
  const [to_, setTo] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState<string | undefined>(undefined);
  const [data, setData] = useState<AnalysisResult | undefined>(undefined);
  const [color, setColor] = useState<Color | undefined>(undefined);

  const getSentimentAnalysis = async (): Promise<AnalysisResult> => {
    const API_URL = 'https://mlops.os.wizeline.io';

    if (!API_URL) {
      throw new Error('API URL not set!');
    }

    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      body: JSON.stringify({ from_, to_, email }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return await response.json();
  }

  const handleSubmit = async () => {
    const result = await getSentimentAnalysis();
    const neg = result.neg * 100;
    const pos = result.pos * 100;
    const neu = result.neu * 100;
    setData({ neg, pos, neu, compound: result.compound });

    if (result.compound >= -0.3 && result.compound <= 0.3) {
      setColor('yellow');
      setText(texts.nr); // Neutral
      return;
    }

    if (result.compound >= -1 && result.compound < -0.3) {
      setColor('red');
      setText(texts.nv); // Negative
      return;
    }

    setColor('green');
    if (result.compound > 0.3 && result.compound < 0.5) {
      setText(texts.sp); // Slightly positive
      return;
    }

    if (result.compound >= 0.5 && result.compound < 0.75) {
      setText(texts.p); // Positive
      return;
    }

    if (result.compound >= 0.75 && result.compound < 0.9) {
      setText(texts.vp); // Very positive
      return;
    }

    if (result.compound >= 0.9 && result.compound <= 1) {
      setText(texts.op); // Overwhelmingly positive
      return;
    }
  }

  return (
    <>
      <Head>
        <title>Capstone Project | Team 7 | MLOps Bootcamp</title>
        <meta name="description" content="Capstone project for the Wizeline MLOps Bootcamp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Email <span className="text-[#cc66ff]">Sentiment</span> Analysis
          </h1>
          {/* relative before-content-[0] before:bg-white before:absolute before:w-[100%] before:h-[100%] before:rounded-2xl before:z-0 */}
          <div className="bg-white flex flex-col min-h-[65vh] min-w-[50vw] max-w-[60rem] rounded-2xl shadow-2xl overflow-hidden">
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
                  <input onChange={(e) => setFrom(e.target.value)} value={from_} className="text-gray-800 bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="email" name="from-input" id="from-input" />
                </div>
                <div id="to-box" className="flex flex-grow-0 border-b-2 py-3 gap-2">
                  <label htmlFor="to-input" className="text-gray-500">To:</label>
                  <input onChange={(e) => setTo(e.target.value)} value={to_} className="text-gray-800 bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="email" name="to-input" id="to-input" />
                </div>
                <div id="subject-box" className="flex-grow-0 border-b-2 py-3 gap-2">
                  <input className="font-medium bg-white px-1 outline-none invalid:outline-1 invalid:outline-red-500 rounded w-full" type="text" name="subject-input" id="subject-input" placeholder="Subject" />
                </div>
                <textarea onChange={(e) => setEmail(e.target.value)} value={email} className="grow py-3 text-gray-800 bg-white outline-none resize-none" placeholder="Write your email" />
              </div>
              <div className="flex-grow-0 gap-5 flex justify-end w-full bg-gray-200 p-5 py-4 items-center">
                <div className="grow grid grid-cols-12">
                  {data && text && color && (
                    <>
                      <div className="col-span-1">
                        {color === 'red' ?
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 stroke-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                          </svg> :
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-9 h-9 stroke-${color}-400`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                          </svg>
                        }
                      </div>
                      <div className="col-span-4 text-gray-600 text-lg flex items-center">
                        {text}
                      </div>
                      <div className="flex relative gap-1 col-span-7 items-center">
                        <div style={{ width: `${data.neg}%` }} className={` bg-red-400 min-h-[1px] h-[1rem] rounded-md`} />
                        <div style={{ width: `${data.neu}%` }} className={` bg-yellow-400 min-h-[1px] h-[1rem] rounded-md`} />
                        <div style={{ width: `${data.pos}%` }} className={` bg-green-400 min-h-[1px] h-[1rem] rounded-md`} />
                      </div>
                    </>
                  )}
                </div>
                <input onClick={handleSubmit} type="button" value="Send now" className="bg-purple-400 cursor-pointer px-4 py-2 text-white text-md font-medium rounded-md flex-grow-0" />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
