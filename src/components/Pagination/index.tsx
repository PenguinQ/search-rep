/** @jsxImportSource @emotion/react */
import { Container } from './styles';

const IconPrev = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#2E3137">
    <path d="M14.5 17.75a.74.74 0 0 1-.53-.22l-5-5a.75.75 0 0 1 0-1.06l5-5A.75.75 0 0 1 15 7.53L10.56 12 15 16.47a.75.75 0 0 1-.5 1.28Z"></path>
  </svg>
);

const IconNext = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#2E3137">
    <path d="M9.5 17.75a.75.75 0 0 1-.5-1.28L13.44 12 9 7.53a.75.75 0 0 1 1-1.06l5 5a.75.75 0 0 1 0 1.06l-5 5a.74.74 0 0 1-.5.22Z"></path>
  </svg>
);

const Pagination = (props: any) => {
  const { page, perPage, total, paginate } = props;

  if (total === 0) return null;

  const totalPages = Math.ceil(total / perPage);
  const maxPages = totalPages >= 1000 ? 1000 / perPage : totalPages; // Github limit to first 1000 results

  const handlePrev = () => {
    if (page > 1) paginate(page - 1);
  };

  const handleNext = () => {
    if (page < maxPages) paginate(page + 1);
  };

  return (
    <div css={Container} className="pagination">
      <button disabled={page === 1} onClick={() => paginate(1)}>
        {IconPrev}
        {IconPrev}
      </button>
      <button disabled={page === 1} onClick={handlePrev}>
        {IconPrev}
      </button>
      <div>
        Page {page} of {maxPages}
      </div>
      <button disabled={page === maxPages} onClick={handleNext}>
        {IconNext}
      </button>
      <button disabled={page === maxPages} onClick={() => paginate(maxPages)}>
        {IconNext}
        {IconNext}
      </button>
    </div>
  );
};

export default Pagination;
