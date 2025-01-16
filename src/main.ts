import { mount } from "./components";
import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };
import persist from '@alpinejs/persist'

type Ressort = {
  name: string,
  id: number
};

Alpine.plugin(persist)
const CHANGE_THRESHOLD = 1;
mount()
const find_reactions = (rid: number, type: 1|-1) => {
  return obj.reactions.filter(el=> {
    return el.ressort == rid && el.type == type
  })
}

Alpine.data("main", function() {

  console.log(obj.ressorts.length);
  return {
    ressorts: obj.ressorts,
    groups: obj.groups,
    
    //@ts-ignore
    costs: this.$persist(new Array(obj.ressorts.length).fill(0)) as number[],
    get spend() {
      return this.costs.reduce((a: number, b: number) => a + b);
    },
    get debt() {
      return Math.max(this.costs.reduce((a: number, b: number) => a + b) - 100, 0);
    },
    shown_reactions: [],
    watch_slider(r: Ressort, ri: number) {

      this.$watch('costs[ri]', (csts, old) => {
        if (Math.abs(csts - old) < CHANGE_THRESHOLD) return;
        //FIXME
        console.log("reacting");
        //@ts-ignore
        this.shown_reactions.push(find_reactions(r.id, csts[ri]>old?1:-1))
      });
    }
  };
});
Alpine.start();
