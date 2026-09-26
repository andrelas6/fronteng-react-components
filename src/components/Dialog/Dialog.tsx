import { useEffect, useRef, type SubmitEventHandler } from "react";

export type DialogProps = {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  // Assumption: parent needs to set this property if they want to open - closing the dialog is only via cancel or confirm. Later I could have a way to dismiss a dialog, but that likely needs the usage of React.Context
  open?: true;
};

const DialogActions = {
  confirm: "confirm",
  cancel: "cancel",
} as const;
export function Dialog({ open, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget, e.nativeEvent.submitter);
    const action = formData.get("action");
    if (action === DialogActions.confirm) {
      console.log("CONFIRM");
      ref.current?.close();
      return;
    }

    if (action === DialogActions.cancel) {
      console.log("CANCEL");
      ref.current?.close();
      return;
    }
  };
  useEffect(() => {
    // since the backdrop si active, the only way callers can close this is programatically without UI interaction (or backdrop interaction)
    if (open) {
      ref.current?.showModal();
    }
  }, [open]);
  return (
    <dialog id="dialog" ref={ref}>
      <section>{children}</section>
      <form method="dialog" onSubmit={onSubmit}>
        <button name="action" value={DialogActions.confirm}>
          Confirm
        </button>
        <button name="action" value={DialogActions.cancel}>
          Cancel
        </button>
      </form>
    </dialog>
  );
}
