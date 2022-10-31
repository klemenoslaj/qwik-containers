import { component$ } from "@builder.io/qwik";

import "./global.css";

export const Root = component$(() => {
  return (
    <section>
      <p>
        <a href="/slot">Slot</a>
      </p>
      <p>
        <a href="/lexical-scope">Lexical scope</a>
      </p>
      <p>
        <a href="/two-listeners">Two listener</a>
      </p>
      <p>
        <a href="/container">Container</a>
      </p>
      <p>
        <a href="/weather">Weather app</a>
      </p>
    </section>
  );
});

export default Root;
