import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async ({ queryKey: [key, page] }) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], fetchPeople, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          {page}
          <button
            onClick={() =>
              setPage((prev) => (data.next !== null ? prev + 1 : prev))
            }
            disabled={data.next === null}
          >
            Next page
          </button>
          <div>
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
