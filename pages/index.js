import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Home = () => {
  const maxRetries = 20;
  const [input, setInput] = useState('');

  const [img, setImg] = useState(''); 
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState('');

  const onChange = (event) => {
    setInput(event.target.value);
  };
  const generateAction = async () => {
    console.log('Generating...');	
    if (isGenerating && retry === 0) return;

  setIsGenerating(true);
    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }

    // const finalInput = input.replace(/raza/gi, 'tushar');

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
    });
  
    const data = await response.json();
  

    if (response.status === 503) {
      setRetry(data.estimated_time);
      return;
    }
  
    // If another error, drop error
    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      return;
    }
    setFinalPrompt(input);
    setInput('');
    setImg(data.image);
    setIsGenerating(false);

  }
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    
  };
  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(`Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`);
        setRetryCount(maxRetries);
        return;
        }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);

      await generateAction();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);
	
const getRandomPrompt = () => {

  const randomPrompts = [
  'Portarait of tushar as a boxer standing in ring in the style of Dan Mumford, 8K, 4K, elegant,highly detailed, cinematic lighting, dynamic lighting,  saturated colours, uhd,hdr, no duplication, no smile, cocept art, cartoon',
  'tushar as evil batman of 90s in hyper realistic style, 8K, 4K, elegant,highly detailed, cinematic lighting, saturated colours, uhd,hdr ',
  'A hyperrealistic pencil drawing of tushar , a determined look on his face, highly detailed, in the style of Albrecht Dürer. hdr,8K , no duplication, no smile, concept art',
  'Intricate Portrait of tushar in the style of artgerm and greg rutkowski, intricate portrait, fantasy, elegant, highly detailed, cinematic lighting, 8K , 4K, uhd, hdr',
  'portrait of tushar as thor, muscular, intricate portrait, elegant, fantastic, digital painting , 8K, cinematic lighting, saturated colours, art of artgerm and greg rutkowski and alphonse mucha, concept art',
  'portrait of tushar as captain america , muscular, intricate portrait, elegant, fantastic, digital painting , 8K, cinematic lighting, saturated colours, art of artgerm and greg rutkowski and alphonse mucha, concept art'
  ]

  const inputFinal = randomPrompts[Math.floor(Math.random() * randomPrompts.length)]
  setInput(inputFinal)
}
  return (
    <div className="root">
      <Head>
        <link rel='icon' href ='https://icon-library.com/images/ai-icon/ai-icon-7.jpg'/>
        <title>Image Craft</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Image Craft</h1>
          </div>
          <div className="header-subtitle">
            <h2>What would I look like if I were Captain America?</h2>
            <h2>Turn me to anyone you want with your own Prompts. Don't forget to refer me as "tushar" in the Prompt</h2>
          
          </div>
          <div className="prompt-container">
        <input className="prompt-box" value={input} onChange={onChange}/>
     <div className="maintain"> 
     <button onClick={generateAction} className={isGenerating? 'random_btn loading': 'random_btn'}>{isGenerating? (<span className='loader'></span>): (<span>Generate</span>)}</button><button onClick={getRandomPrompt} className='random_btn'><span>Random </span><span>Prompt</span></button>
     </div>
     {/* <button onClick={generateAction} className={isGenerating? "btn loading": 'btn'}>{isGenerating? (<span className='loader'></span>): (<span>Generate</span>)}</button>
     
  <button className="random_btn">Random Prompt</button>*/}
   
     {/* <div className="generate"> <button className={isGenerating? 'btn loading': 'btn'} onClick={generateAction}>{isGenerating? (    <span className="loader"></span>): (<span>Generate</span>)}</button>
</div> */}
      </div>
        </div>
        {img && (
      <div className="output-content">
        <Image src={img} width={512} height={512} alt={input} />
        <p>{finalPrompt}</p>

      </div>
    )}

      </div>
<div className="exampleImage">
  <img width={120} height={120} src={'https://i.ibb.co/THgWBTM/tushar-Generated6.jpg'} alt="example Image1" />
  <img src="https://i.ibb.co/NFpfKTm/tushar-Generated9.jpg" alt="" />
  <img src="https://i.ibb.co/CpjjxY4/tushar-Generated8.jpg" alt="" />
  <img src="https://i.ibb.co/3vpyqhh/tushar-Generated7.jpg" alt="" />
  </div>   
      <div className="badge-container grow">
        <a
          href="https://twitter.com/tusharrvrma"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <img src='https://www.linkpicture.com/q/logoProfile_1.png' alt="logo" />
            <p>build by Tushar</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
