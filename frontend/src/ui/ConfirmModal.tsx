import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "./Button";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow space-y-4 max-w-sm w-full">
          {title && (
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          )}
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline">{cancelText}</Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
