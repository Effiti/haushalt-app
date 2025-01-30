import { BaseProps } from "tsx-dom";
import { h } from "tsx-dom";

export default function Dialog(props: BaseProps) {
  return (
    <dialog id="startup" class="modal prose">
      <div class="modal-box w-11/12 max-w-full">
        {props.children}
        <form method="dialog">
          <button class="btn btn-lg btn-primary">Los geht's</button>
        </form>
      </div>
    </dialog>
  );
}
