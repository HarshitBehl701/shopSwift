import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IPopupParam } from "@/interfaces/componentsInterface";
import { cn } from "@/lib/utils";

function Popup({buttonText,buttonStyling,children,buttonVariant}:IPopupParam) {
    const [open, setOpen] = useState(false);
  return (
    <>
    <Button onClick={() => setOpen(!open)} className={cn("cursor-pointer bg-blue-600 text-white text-xs",buttonStyling)} variant={buttonVariant}>{buttonText}</Button>

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