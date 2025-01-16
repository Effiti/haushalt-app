

const components = {
};


function docReady(fn: Function) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    //@ts-ignore
    document.addEventListener("DOMContentLoaded", fn);
  }
}
export const mount = () => {
  docReady(() => {
    for(let [name, fn] of Object.entries(components)) {
      let targets = document.querySelectorAll(name);
      targets.forEach(e => {
      //@ts-ignore
        let el = (fn()) as HTMLElement;
        console.log(el);
        e.replaceWith(el.cloneNode());
        e.innerHTML = el.innerHTML;
      });
    }
  });
}
