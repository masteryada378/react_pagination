import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage')) || 5;
  const rawPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(items.length / perPage);
  const currentPage = Math.max(1, Math.min(rawPage, totalPages));

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const visibleItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const startItemNum = items.length === 0 ? 0 : indexOfFirstItem + 1;
  const endItemNum = Math.min(indexOfLastItem, items.length);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: '1',
      perPage: event.target.value,
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemNum} - ${endItemNum} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
