import { cookiebotClientId } from "@mkboard/thirdparties";

export function loadScripts(): Promise<boolean> {
  return Promise.resolve()
    .then(() =>
      loadScript("https://consent.cookiebot.com/uc.js", (script) => {
        script.id = "Cookiebot";
        script.dataset.cbid = cookiebotClientId;
        script.dataset.blockingmode = "auto";
        script.dataset.framework = "TCFv2.2";
      }),
    )
    .then(() => loadScript("https://a.pub.network/mkboard-com/pubfig.min.js"))
    .then(
      () => true,
      () => false,
    );
}

function loadScript(
  url: string,
  customize: (script: HTMLScriptElement) => void = () => {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Cannot load script [${url}]`));
    };
    script.src = url;
    customize(script);
    document.head.appendChild(script);
  });
}
