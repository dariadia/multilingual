import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

import { Layout } from "../../components";
import { getSortedBooksData } from "../../lib/books";
import { useTranslation } from "../../intl/useTranslation";

interface Props {
  locale: string;
  allBooksData: {
    date: string;
    title: string;
    lang: string;
    description: string;
    id: any;
  }[];
}

const Book: NextPage<Props> = ({ locale, allBooksData }) => {
  const { t } = useTranslation();
  const booksData = allBooksData.filter((book) => book.lang === locale);

  // Pagination
  const booksPerPage = 10;
  const numPages = Math.ceil(booksData.length / booksPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const pagedBooks = booksData.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Date localization options
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Layout className="books" title={t("books")}>
      <section className="page-content">
        <h1>{t("books")}</h1>
        {pagedBooks.map((book) => (
          <article key={book.id} className="book">
            <Link href={`/[lang]/book/[id]`} as={`/${locale}/book/${book.id}`}>
              <a>
                <h3>{book.title}</h3>
              </a>
            </Link>
            <time>
              {new Date(book.date).toLocaleDateString(locale, dateOptions)}
            </time>
            {book.description && <p>{book.description}</p>}
          </article>
        ))}

        {numPages > 1 && (
          <div className="pagination">
            {Array.from({ length: numPages }, (_, i) => (
              <button
                key={`pagination-number${i + 1}`}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const allBooksData = getSortedBooksData();

  return {
    props: {
      locale: ctx.params?.lang || "de",
      allBooksData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "de" } }],
    fallback: false,
  };
};

export default Book;
