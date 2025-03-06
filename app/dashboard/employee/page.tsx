'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/lib/toast";
import AlertConfirmation from "@/app/lib/alert_confirmation";
import {
    Table, Thead, Tbody, Tr, Th, Td, Input, Button, Box, Select, IconButton, Checkbox,
    Menu, MenuButton, MenuList, MenuItem, HStack, Heading, Divider
} from "@chakra-ui/react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender
} from "@tanstack/react-table";
import { Allowances } from "@/app/interfaces"
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import LoadingOverlay from "@/app/lib/loading_overlay";

export default function Page() {
    const router = useRouter();
    const [filter, setFilter] = useState("");
    const [pageSize, setPageSize] = useState(10); // Set jumlah data per halaman
    const [dataTable, setDataTable] = useState<Array<Allowances>>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showToast = useCustomToast()


    const getData = useCallback(async () => {
        setLoading(true)
        const res = await fetch(`/api/employee`, { method: "GET" });
        const data = await res.json();
        setDataTable(data);
        setLoading(false)
        if (data.error) {
            showToast(data.error, "error")
        }
    }, [])

    useEffect(() => {
        getData();
    }, [getData]);

    // Fungsi untuk menghapus data setelah konfirmasi
    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            const res = await fetch(`/api/employee/${selectedId}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                showToast(data.message, "success");
                setDeleteOpen(false)
                getData(); // Perbarui data tabel
            } else {
                showToast(data.error, "error");
            }
        } catch (error) {
            if (typeof error === "string") {
                console.error("Error deleting data:", error.toUpperCase());
            } else if (error instanceof Error) {
                console.error("Error deleting data:", error.message);
            }
            showToast("Error deleting data:", "error");
        }
    };

    const table = useReactTable({
        data: dataTable,
        columns: [
            { accessorKey: "nama_pegawai", header: "Name" },
            { accessorKey: "jabatan", header: "Designation" },
            {
                accessorKey: "aksi",
                header: "Actions",
                cell: ({ row }) => (
                    <Box display="flex" justifyContent="center">
                        <Menu>
                            <MenuButton as={Button} fontSize={12} size="xs" >
                                <PiDotsThreeOutlineVerticalFill />
                            </MenuButton>
                            <MenuList fontSize={12}>
                                <MenuItem onClick={() => router.push(`/dashboard/employee/${row.original.id}`)}>Edit</MenuItem>
                                <MenuItem onClick={() => {
                                    setSelectedId(row.original.id)
                                    setDeleteOpen(true)
                                }}>Delete</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>

                ),
            },
        ],
        state: { globalFilter: filter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } },
    });

    return (
        <Box p={4} fontSize={12}>
            {loading && <LoadingOverlay />}
            <Heading as='h5' size='sm'>List of Employee</Heading>
            <Divider borderColor="crimson" borderWidth="2px" my={4} />
            {/* Input Pencarian */}
            <Input
                size="sm"
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                mb={4}
            />

            {/* Tabel */}
            <Table variant='striped' size="sm" colorScheme="gray">
                <Thead >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} textAlign={["Active", "Actions"].includes(header.column.columnDef.header as string) ? "center" : "left"}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Kontrol Pagination */}
            <HStack justify="space-between" mt="4" flexDirection={{ base: "column", md: "row" }} align="stretch">
                <Box display="flex" alignItems="center" justifyContent={{ base: "center", md: "flex-start" }} mb={{ base: 4, md: 0 }}>
                    <IconButton
                        aria-label='Prev'
                        onClick={() => table.previousPage()}
                        isDisabled={!table.getCanPreviousPage()}
                        mr={2}
                        icon={<GrCaretPrevious />}
                    />
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <IconButton
                        aria-label='Next'
                        onClick={() => table.nextPage()}
                        isDisabled={!table.getCanNextPage()}
                        ml={2}
                        icon={<GrCaretNext />}
                    />
                    <Select
                        size='sm'
                        w="100px"
                        ml={2}
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPageSize(newSize);
                            table.setPageSize(newSize);
                        }}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size} rows
                            </option>
                        ))}
                    </Select>
                </Box>

                <Button
                    size="sm"
                    colorScheme='red'
                    onClick={() => router.push("/dashboard/employee/create")}
                    alignSelf={{ base: "center", md: "flex-end" }}
                    w={{ base: "full", md: "auto" }}
                >
                    New Employee
                </Button>
            </HStack>

            <Divider borderColor="crimson" borderWidth="2px" my={4} />

            <AlertConfirmation
                isOpen={isDeleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
                description="Are you sure to delete this item? This action cannot be undone."
            />
        </Box>
    );
}

