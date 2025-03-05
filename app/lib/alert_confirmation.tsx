import {
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay, Button
} from "@chakra-ui/react";
import { useRef } from "react";

interface AlertConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description?: string;
}

export default function AlertConfirmation({ isOpen, onClose, onConfirm, description }: AlertConfirmationProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {description}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}