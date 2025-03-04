import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        crimson: {
            500: '#DC143C', // Warna merah Crimson
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
})

export default theme
