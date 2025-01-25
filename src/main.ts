import { components } from "./components";
import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };
import persist from '@alpinejs/persist'

obj.groups = obj.groups.sort((a, b) => a.id - b.id);
obj.ressorts = obj.ressorts.sort((a, b) => a.id - b.id);
obj.reactions = obj.reactions.sort((a, b) => a.id - b.id);

type Ressort_ = {
  name: string,
  id: number,
  sliders?: string | undefined,
};
type Reaction = {
  group: number,
  ressort: number,
  threshold: number,
  text: string,
  type: number,
  id: number,
  part?: number | undefined
}

class Ressort {
  id: number = 0;
  name: string = "";
  parts: number[] = [25, 25, 50];
  sliders: string = "";
  dialog: HTMLElement | undefined = undefined;

  constructor(base: Ressort_) {
    this.id = base.id;
    this.name = base.name;
    this.dialog = base.id in components
      //@ts-ignore
      ? components[base.id] as HTMLElement
      : components.default as HTMLElement;
    this.sliders = base.sliders || "default";
    if (this.sliders == "default") {
      this.parts = [50];
    } else if (this.sliders == "rente") {
      this.parts = [25, 25, 50];
    }

  }
  mount_dialog(el: HTMLElement) {
    el.replaceWith(this.dialog || "");
  }
  
  get cost() {
    return this.parts.length == 1 ? this.parts[0] : this.parts[1];
  }
  set cost(a: number) {
    this.parts.length == 1 ? this.parts[0] = a : this.parts[1] = a;
  }

  get a() {
    return this.parts[0];
  }
  get b() {
    return this.parts[1];
  }
  get c() {
    return this.parts[2];
  }
  set a(a: number) {
    this.c = a + this.b;
    this.parts[0] = a;
  }
  set b(b: number) {
    this.c = this.a + b;
    this.parts[1] = b;
  }
  set c(c: number) {
    this.parts[2] = c;
  }


}

class Group {
  shown_reactions: Reaction[] = [];
  possible_reactions: Reaction[] = [];
  id = 0;
  icon = "";
  name = "";
  sliders: string | null = null;
  constructor(content: { id: number, name: string, icon: string, sliders: string | undefined },) {
    this.id = content.id;
    this.name = content.name;
    this.icon = content.icon;
    this.possible_reactions = obj.reactions.filter((r) => {
      return r.group == this.id;
    });
    if (content.sliders !== undefined) this.sliders = content.sliders;
  }
  process(rid: number, parts: number[]) {
    let temp = this.shown_reactions.filter(el => {
      return el.ressort !== rid;
    })
    let added = this.possible_reactions.filter(el => {
      if (el.ressort != rid)
        return false;
      let changed = parts[el.part || 0];
      return (el.type == 1 ? changed > el.threshold : changed < el.threshold)
    })
    let result = temp.concat(added).sort((a, b) => a.id - b.id);
    // update only if something actually changed, so we can have transitions
    if (result !== this.shown_reactions) this.shown_reactions = result;
  }
}

Alpine.plugin(persist)

Alpine.data("main", function() {

  console.log(obj.ressorts.length);
  return {
    //@ts-ignore
    ressorts: obj.ressorts.map(el => new Ressort(el, this.$persist)),
    //@ts-ignore
    groups: obj.groups.map(el => new Group(el)),

    get spend() {
      return this.ressorts.reduce<number>((a: number, b: Ressort) => a + b.cost, 0);
    },
    get debt() {
      return Math.max(this.spend - 100, 0);
    },
    watch_slider(r: Ressort, _ri: number) {

      this.groups.forEach(group => group.process(r.id, r.parts));
      this.$watch('r.parts', (parts) => {
        this.groups.forEach(group => group.process(r.id, parts));
      });
    }
  };
});
Alpine.start();
