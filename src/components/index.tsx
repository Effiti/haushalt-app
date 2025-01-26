import { h } from 'tsx-dom';
import Dialog from './Dialog.tsx';
//@ts-ignore
import { ReactComponent as Verteidigung } from "./texts/verteidigung.md"
//@ts-ignore
import { ReactComponent as Umwelt } from "./texts/umwelt.md"
//@ts-ignore
import { ReactComponent as Sample } from "./texts/sample.md"
//@ts-ignore
import { ReactComponent as Forschung } from "./texts/forschung.md"
//@ts-ignore
import { ReactComponent as Integration } from "./texts/integration.md"

const wrap = (C: () => JSX.Element) => <Dialog><C></C></Dialog>

export const components = {
  2: wrap(Integration),
  3: wrap(Verteidigung),
  4: wrap(Umwelt),
  5: wrap(Forschung),
  default: wrap(Sample)
};

export const mount = (target: HTMLElement, name: string) => {
  //@ts-ignore
  let el = (components[name]()) as HTMLElement;
  console.log(el);
  target.innerHTML = el.outerHTML;
}
