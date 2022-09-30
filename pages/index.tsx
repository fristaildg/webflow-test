import type { NextPage } from 'next';
import Head from 'next/head';
import parseHtml from 'html-react-parser';

type HomeProps = {
  bodyContent: string;
  headContent: string;
};

const Home: NextPage<HomeProps> = ({ bodyContent, headContent }) => {
  return (
    <>
      <Head>
        {parseHtml(headContent)}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }}></div>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const cheerio = await import('cheerio');
  const axios = (await import('axios')).default;

  const response = await axios('https://adritellez.webflow.io/');
  const html = response.data;

  const $ = cheerio.load(html);
  const bodyContent = $('body').html();
  const headContent = $('head').html();

  return {
    props: {
      bodyContent,
      headContent,
    },
    revalidate: 10,
  };
};
