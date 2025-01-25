import { h } from 'tsx-dom';
import Dialog from './Dialog.tsx';
//@ts-ignore
import { ReactComponent as Verteidigung } from "./texts/verteidigung.md"
//@ts-ignore
import { ReactComponent as Sample } from "./texts/sample.md"

const wrap = (C:()=>JSX.Element) => <Dialog><C></C></Dialog>

export const components = {
  3: wrap(Verteidigung),
	default: wrap(Sample)
};

export const mount = (target: HTMLElement, name: string) => {
  //@ts-ignore
  let el = (components[name]()) as HTMLElement;
  console.log(el);
  target.innerHTML = el.outerHTML;
}
