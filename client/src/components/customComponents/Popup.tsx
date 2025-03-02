import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IPopupParam } from "@/interfaces/componentInterfaces";

function Popup({buttonText,buttonStyling,children,buttonVariant}:IPopupParam) {
    const [open, setOpen] = useState(false);
  return (
    <>
    <Button onClick={() => setOpen(!open)} className={cn("cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-xs",buttonStyling)} variant={buttonVariant}>{buttonText}</Button>

        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-lg">
            {children}
        </DialogContent>
        </Dialog>
    </>
  )
}

export default Popup