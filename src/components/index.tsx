import { h } from 'tsx-dom';
import Dialog from './Dialog.tsx';
import StartupDialog from './StartupDialog.tsx';
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
//@ts-ignore
import { ReactComponent as Rente } from "./texts/rente.md"
//@ts-ignore
import { ReactComponent as Infrastruktur } from "./texts/infrastruktur.md"
//@ts-ignore
import { ReactComponent as Digitalisierung } from "./texts/digitalisierung.md"
//@ts-ignore
import { ReactComponent as Startup } from "./texts/startup.md"

const wrap = (C: () => JSX.Element) => <Dialog><C></C></Dialog>
const wrapStartup = (C: () => JSX.Element) => <StartupDialog><C></C></StartupDialog>

export const components = {
  0: wrap(Rente),
  1: wrap(Infrastruktur),
  2: wrap(Integration),
  3: wrap(Verteidigung),
  4: wrap(Umwelt),
  5: wrap(Forschung),
  7: wrap(Digitalisierung),
  startup: wrapStartup(Startup),
  default: wrap(Sample)
};

export const mount = (target: HTMLElement, name: string | number) => {
  //@ts-ignore
  console.log(components, name, components[name]);
  //@ts-ignore
  let el = (components[name]) as HTMLElement;
  target.replaceWith(el);
}
