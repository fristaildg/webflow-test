import type { NextPage } from 'next';
import Head from 'next/head';
import parseHtml from 'html-react-parser';
import Link from 'next/link';

type ErrorPageProps = {
  bodyContent: string;
  headContent: string;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ bodyContent, headContent }) => {
  return (
    <>
      <Head>
        {parseHtml(headContent)}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }}></div>
      <Link href="/errorsito">Al errorsito</Link>
    </>
  )
}

export default ErrorPage

export const getStaticProps = async () => {
  const cheerio = await import('cheerio');
  const axios = (await import('axios')).default;

  const response = await axios('https://adritellez.webflow.io/errorsito');
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
