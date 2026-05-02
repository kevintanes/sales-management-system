import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { MdAdd } from "react-icons/md";

interface FormDialogProps {
  title: string;
  description?: string;
  triggerLabel?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FormDialog = ({
  children,
  title,
  triggerLabel,
  trigger,
  description,
  onOpenChange,
  open,
}: FormDialogProps) => {
  const defaultTrigger = (
    <Button className="bg-primary text-primary-foreground min-h-10 gap-2 rounded-2xl px-4 py-2 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5">
      <MdAdd /> {triggerLabel}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
