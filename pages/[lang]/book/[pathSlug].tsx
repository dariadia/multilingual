import { GetStaticProps, GetStaticPaths, NextPage } from "next";

import { getAllBooksPaths, getBooksData } from "../../../lib/books";
import { Layout } from "../../../components";
import { useTranslation } from "../../../intl/useTranslation";
import { BookData } from "../books";


const Book: NextPage<BookData> = ({ bookData }) => {
  const { t } = useTranslation();
  const { title, series, contentHtml } = bookData;

  return (
    <Layout title={title}>
      <article className="book-content">
        <h3>{series?.name}. {t("book")} {series?.book_number}</h3>
        <h3>{t("episode")} {series?.episode_number}</h3>
        <h1>{title}</h1>
        <div
          className="book-text"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookData = await getBooksData(`/${params.lang}/${params.pathSlug}`);

  return {
    props: {
      locale: params?.lang || "en",
      bookData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBooksPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Book;
