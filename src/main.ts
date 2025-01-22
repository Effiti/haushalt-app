import { mount } from "./components";
import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };
import persist from '@alpinejs/persist'
obj.groups = obj.groups.sort((a,b)=>a.id-b.id);
obj.ressorts= obj.ressorts.sort((a,b)=>a.id-b.id);
obj.reactions= obj.reactions.sort((a,b)=>a.id-b.id);

type Ressort = {
  name: string,
  id: number
};
type Reaction = {
  group: number,
  ressort: number,
  threshold: number,
  text: string,
  type: number,
  id: number
}

class Group {
  shown_reactions:Reaction[] = [];
  possible_reactions: Reaction[] = [];
  id = 0;
  icon = "";
  name = "";
  sliders: string|null = null;
  constructor(content: {id:number, name: string, icon: string, sliders: string|undefined},) {
    this.id = content.id;
    this.name = content.name;
    this.icon = content.icon;
    this.possible_reactions = obj.reactions.filter((r)=> {
      return r.group == this.id;
    });
    if (content.sliders!==undefined) this.sliders=content.sliders;
  }
  process(rid: number, new_cost: number) {
    let temp = this.shown_reactions.filter(el=> {
      return el.ressort!==rid;
    })
    let added = this.possible_reactions.filter(el=>{
      return el.ressort == rid && (el.type==1 ? new_cost > el.threshold : new_cost < el.threshold)
    })
    let result = temp.concat(added).sort((a,b)=>a.id-b.id);
    // update only if something actually changed, so we can have transitions
    if(result !== this.shown_reactions) this.shown_reactions = result;
  }
}

Alpine.plugin(persist)
mount()

Alpine.data("main", function() {

  console.log(obj.ressorts.length);
  return {
    ressorts: obj.ressorts,
    //@ts-ignore
    groups: obj.groups.map(el => new Group(el)),
    
    //@ts-ignore
    costs: this.$persist(new Array(obj.ressorts.length).fill(0)) as number[],
    get spend() {
      return this.costs.reduce((a: number, b: number) => a + b);
    },
    get debt() {
      return Math.max(this.costs.reduce((a: number, b: number) => a + b) - 100, 0);
    },
    watch_slider(r: Ressort, ri: number) {

      this.groups.forEach(group=>group.process(r.id, this.costs[ri]));
      this.$watch('costs[ri]', (cst) => {
        this.groups.forEach(group=>group.process(r.id, cst));
      });
    }
  };
});
Alpine.start();
