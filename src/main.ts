import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };



Alpine.data("main", ()=>{
  console.log(obj.ressorts.length);
  return {
  ressorts: obj.ressorts,
  groups: obj.groups,
  amounts:  new Array(obj.ressorts.length).fill(0),
  get spend() {
    return this.amounts.reduce((a,b)=>a+b);
  },
  get debt() {
    return Math.max(this.amounts.reduce((a,b)=>a+b)-100, 0);
  }
};
});
Alpine.start();
