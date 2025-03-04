import { useToast } from "@chakra-ui/react";

export function useCustomToast() {
    const toast = useToast();


    return (description: string, status: "success" | "error" | "warning" | "info") => {

        toast({
            description,
            status,
            duration: 3000, // Durasi dalam milidetik (3 detik)
            isClosable: true,
            position: "top-right", // Bisa diubah ke "top", "bottom", dll.
        });
    };
}
