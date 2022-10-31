import { renderToStream, RenderToStreamOptions } from "@builder.io/qwik/server";

interface Config {
  readonly [key: string]: {
    readonly path: string;
    readonly node: string;
  };
}

const CONFIG_URL =
  "https://raw.githubusercontent.com/klemenoslaj/qwik-containers/main/src/config.json";

const fetchContainer = (pathName: string) =>
  // import("./config.json")
  //   .then((m) => m.default as Config)
  fetch(CONFIG_URL)
    .then((r) => r.json() as Promise<Config>)
    .then((config) =>
      import(/* @vite-ignore */ config[pathName]!.path).then(
        (m) => m[config[pathName]!.node]
      )
    );

/**
 * Entry point for server-side pre-rendering.
 *
 * @returns a promise when all of the rendering is completed.
 */
export default async function (opts: RenderToStreamOptions) {
  const url = new URL(opts.envData!.url);
  const Component = await fetchContainer(url.pathname);

  // Render segment instead
  if (url.searchParams.has("fragment")) {
    return renderToStream(
      <>
        <Component />
      </>,
      {
        debug: true,
        containerTagName: "container",
        // streaming: {
        //   inOrder: {
        //     buffering: 'marks',
        //   },
        // },
        qwikLoader: {
          include:
            url.searchParams.get("loader") === "false" ? "never" : "auto",
          events: ["click"],
        },
        ...opts,
      }
    );
  }

  return renderToStream(
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Component />
      </body>
    </html>,
    {
      debug: true,
      ...opts,
    }
  );
}
