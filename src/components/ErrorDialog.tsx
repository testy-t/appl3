import { AlertCircle, RefreshCw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  errorCode: string;
  errorMessage: string;
}

const ErrorDialog = ({ open, onClose, errorCode, errorMessage }: ErrorDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="flex items-center flex-col">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl">Произошла ошибка</AlertDialogTitle>
          <AlertDialogDescription className="mt-4 text-center">
            <span className="block font-mono bg-gray-100 p-2 rounded mb-2">
              Код ошибки: {errorCode}
            </span>
            <span className="text-gray-700">{errorMessage}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogAction 
            className="w-full bg-apple-blue hover:bg-apple-blue/90 flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <RefreshCw size={16} />
            Попробовать снова
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog;