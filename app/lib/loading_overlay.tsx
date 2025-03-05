import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingOverlay() {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="9999"
        >
            <Spinner size="xl" color="red.500" />
        </Box>
    );
}
