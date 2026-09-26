import { useState } from "react";
import { Dialog } from "./Dialog";


export default function DialogPage() {
  const [open, setOpen] = useState<true | undefined>(undefined)
  const onCancel = () => {}
  const onConfirm = () => {}
  const openDialog = () => {
    setOpen(true)
  }
  return <div>
    <button onClick={openDialog} >TOGGLE DIALOG</button>
    <Dialog onCancel={onCancel} onConfirm={onConfirm} open={open}>
      <>
        <h2>HELLO</h2>
        <p>CONTENT DIALOG</p>
      </>
    </Dialog>
  </div>
}
