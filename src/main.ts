import { components, mount } from "./components";
import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };
import persist from '@alpinejs/persist'

const MAX_SPEND = 500;
// Maximum divergence from the MAX_SPEND allowed under Schuldenbremse
const SCHULDEN_BREMSE = 15;

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

type should_stop_fn_type = (old_cost: number, new_cost: number) => boolean;

class Ressort {
  id: number = 0;
  name: string = "";
  parts: number[] = [25, 25, 50];
  sliders: string = "";
  dialog: HTMLElement;
  should_stop: should_stop_fn_type;

  constructor(base: Ressort_, should_stop_fn: should_stop_fn_type) {
    console.log(should_stop_fn);
    this.should_stop = should_stop_fn;
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
    if (this.should_stop(this.cost, a)) {
      ////RECURSION
      return;
    }
    this.parts.length == 1 ? this.a = a : this.b = a;
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
  const create_ressort = (obj: {should_stop_update: should_stop_fn_type}) => function(el: Ressort_) {
      //@ts-ignore
      return new Ressort(el, obj.should_stop_update.bind(obj))
  }
  return {
    mount: mount,
    show(id: string) {
      //@ts-ignore
      document.getElementById(id).showModal();
    },
    has_been_here: Alpine.$persist(false), 
    should_stop_update(old_cost: number, new_cost: number) {
        if(!this.schulden_bremse) return false;
        console.log(old_cost, new_cost);
        if(old_cost>new_cost) return false;
        if(this.debt>= SCHULDEN_BREMSE) return true;
        let debt_after_update = (this.spend - MAX_SPEND - old_cost + new_cost);
        console.log(debt_after_update);
        return debt_after_update>SCHULDEN_BREMSE;
    },
    init() {
      if(!this.has_been_here) {
        this.has_been_here = true;
        //@ts-ignore
        docReady(()=>document.getElementById("startup").showModal());
      }
      //@ts-ignore
      this.ressorts = obj.ressorts.map(create_ressort(this));
    },
    //@ts-ignore
    ressorts: [],
    //@ts-ignore
    groups: obj.groups.map(el => new Group(el)),

    schulden_bremse: false,

    get allow_bremse() {
      return this.schulden_bremse || this.debt <= SCHULDEN_BREMSE;
    },

    get spend() {
      return this.ressorts.reduce<number>((a: number, b: Ressort) => a + b.cost, 0);
    },
    get debt() {
      return Math.max(this.spend - MAX_SPEND, 0);
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
