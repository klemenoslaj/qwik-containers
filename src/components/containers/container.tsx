import { component$, useStyles$, useStore, useWatch$ } from "@builder.io/qwik";

interface ContainerProps {
  url: string;
}

export const Containers = component$(() => {
  return (
    <div class="my-app p-20">
      <Container url="/slot"></Container>
      <Container url="/two-listeners"></Container>
      <Container url="/weather"></Container>
      <Container url="/lexical-scope"></Container>
      {/* <Container url="/await"></Container> */}
    </div>
  );
});

export const Container = component$((props: ContainerProps) => {
  useStyles$(`
    .container {
      margin: 20px;
      padding: 5px;
      border: 1px solid black;
      border-radius: 10px;
    }
    .frame {
      padding: 5px;
      border: 1px solid grey;
      border-radius: 5px;
    }
    .url {
      background: #d1d1d1;
      border-radius: 10px;
      padding: 5px 10px;
      margin-bottom: 10px;
    }
    `);
  const state = useStore({
    url: "",
    html: "",
  });

  useWatch$(async ({ track }) => {
    track(() => props.url);
    const url = `http://localhost:5173${props.url}?fragment`;

    const res = await fetch(url, {
      headers: new Headers({
        Accept: "text/html",
      }),
    });

    state.url = url;
    state.html = await res.text();
  });

  return (
    <div class="container">
      <div class="url">{state.url}</div>
      <div class="frame" dangerouslySetInnerHTML={state.html} />
    </div>
  );
});

export default Containers;
