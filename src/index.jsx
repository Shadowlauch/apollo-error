/*** APP ***/
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";

import { Layout } from "./layout.jsx";
import "./index.css";
import {Mutations} from "./mutations.jsx";
import client from "./client.js";

const ALL_PEOPLE = gql`
  query AllPeople($test: String!) {
    people(test: $test) {
      id
      name
    }
  }
`

function App() {
  const [test, setTest] = useState('test')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!isDone) {
      setTest('')
      setIsDone(true);
    } else {
      setTest('test');
    }
  }, [isDone]);

  const { loading, data, previousData } = useQuery(ALL_PEOPLE, {
    fetchPolicy: 'cache-and-network',
    variables: {test},
    skip: !test, // Skip the query if test is empty
  });

  const records = data?.people ?? previousData?.people ?? [];
  console.log("data", !test, records);

  return (
    <main>
      <h3>Home</h3>
      <Mutations />
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {records.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>
);
