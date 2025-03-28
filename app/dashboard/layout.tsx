'use client'

import {
    Box, Flex, VStack, HStack, Link, Text, IconButton, Drawer, DrawerOverlay,
    DrawerContent, DrawerBody, useDisclosure, Accordion, AccordionItem,
    AccordionButton, AccordionPanel, AccordionIcon, Image
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex minHeight="100dvh">
            {/* Sidebar untuk Desktop */}
            <Box
                w={{ base: "0", md: "250px" }} // Sembunyikan di mobile, tampil di desktop
                bg="gray.800"
                color="white"
                p="4"
                display={{ base: "none", md: "block" }}
            >
                <SidebarContent />
            </Box>

            {/* Drawer untuk Mobile */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody bg="gray.800" color="white">
                        <SidebarContent onClose={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Area Konten */}
            <Box flex="1" p="6" overflowY="auto"> {/* Tambahkan `overflowY="auto"` */}
                {/* Navbar */}
                <HStack justify="space-between" mb="4">
                    {/* Tombol Menu untuk Mobile */}
                    <IconButton
                        icon={<HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ base: "block", md: "none" }}
                        onClick={onOpen}
                    />
                    <Image src="/images/logo.png" alt="Logo" height={30} />
                    <Text color="crimson.500">Admin</Text>
                </HStack>

                {/* Main Content */}
                <Box py="2" borderRadius="md" h="full">
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}

/* Komponen Sidebar */
function SidebarContent({ onClose }: { onClose?: () => void }) {
    return (
        <VStack align="stretch" spacing={4}>
            <Text fontSize="xl" fontWeight="bold">Admin Panel</Text>
            <NavItem href="/dashboard" label="Dashboard" onClose={onClose} />

            {/* Submenu Manajemen Pengguna */}
            <Accordion allowToggle>
                <AccordionItem border="none" >
                    <h2>
                        <AccordionButton _hover={{ bg: "gray.700" }} borderRadius="md" px="2">
                            <Box flex="1" textAlign="left">Data master</Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={2}>
                        <VStack align="start" spacing={2} pl={4}>
                            <NavItem href="/dashboard/allowances" label="Allowances" onClose={onClose} />
                            <NavItem href="/dashboard/employee" label="List of Employee" onClose={onClose} />
                            <NavItem href="/dashboard/etr" label="Effective Tax Rate" onClose={onClose} />
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <NavItem href="/dashboard/payslip" label="Payslip" onClose={onClose} />
        </VStack>
    )
}

/* Komponen Link Navigasi */
function NavItem({ href, label, onClose }: { href: string; label: string; onClose?: () => void }) {
    return (
        <Link
            as={NextLink}
            href={href}
            px="2"
            borderRadius="md"
            _hover={{ bg: 'gray.700' }}
            onClick={onClose} // Tutup menu saat di klik di mobile
            w="full"
            display="block"
        >
            {label}
        </Link>
    )
}
