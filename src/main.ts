import Alpine from 'alpinejs';
import "./app.css";
import obj from "./content.json" with { "type": "json" };
import persist from '@alpinejs/persist'
 
Alpine.plugin(persist)


Alpine.data("main", function(){

  console.log(obj.ressorts.length);
  return {
  ressorts: obj.ressorts,
  groups: obj.groups,
  //@ts-ignore
  amounts:  this.$persist(new Array(obj.ressorts.length).fill(0)),
  get spend() {
    return this.amounts.reduce((a:number,b:number)=>a+b);
  },
  get debt() {
    return Math.max(this.amounts.reduce((a:number,b:number)=>a+b)-100, 0);
  }
};
});
Alpine.start();
