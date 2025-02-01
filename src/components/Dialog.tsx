import { BaseProps } from "tsx-dom";
import { h } from "tsx-dom";

export default function Dialog(props: {id?: string} & BaseProps) {
  return (
    <dialog id={props.id||"modal"} class="modal prose">
      <div class="modal-box w-11/12 max-w-full">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      {props.children}
      </div>
    </dialog>
  );
}
