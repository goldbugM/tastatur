export function loadScripts(): Promise<boolean> {
  // Disabled - external advertising services removed
  return Promise.resolve(false);
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
