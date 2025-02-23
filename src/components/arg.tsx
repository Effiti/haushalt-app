import { h } from "tsx-dom"
//@ts-ignore
import { ReactComponent as sophie } from "./texts/arg/sophie.md"
//@ts-ignore
import { ReactComponent as lilian } from "./texts/arg/lilian.md"
//@ts-ignore
import { ReactComponent as livia } from "./texts/arg/livia.md"
//@ts-ignore
import { ReactComponent as finn } from "./texts/arg/finn.md"
//@ts-ignore
import { ReactComponent as greta} from "./texts/arg/greta.md"
const texts = [
  sophie,
  lilian,
  livia,
  finn,
  greta
]


  
export default function Arg() {
  return <div class="grid md:grid-cols-3 grid-cols-1 w-full">
    { texts.map( Thetext =>
      <div class="card bg-base-100 w-full shadow-xl px-5 py-10 items-center m-8 place-items-center" >
        <div class="card-body">
          <Thetext></Thetext>
        </div>
      </div>
      )
    }
    </div>
  
}
