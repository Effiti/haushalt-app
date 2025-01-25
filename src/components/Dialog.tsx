import { BaseProps } from "tsx-dom";
import { h } from "tsx-dom";

export default function Dialog(props: BaseProps) {
  return (
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box w-11/12 max-w-full">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      {props.children}
      </div>
    </dialog>
  );
}
