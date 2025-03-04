'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/lib/toast";
import {
    Table, Thead, Tbody, Tr, Th, Td, Input, Button, Box, Select, IconButton, Checkbox,
    Menu, MenuButton, MenuList, MenuItem, HStack
} from "@chakra-ui/react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Allowances } from "@/app/interfaces";


export default function Page() {
    const router = useRouter();
    const [filter, setFilter] = useState("");
    const [pageSize, setPageSize] = useState(10); // Set jumlah data per halaman
    const [dataTable, setDataTable] = useState<Array<Allowances>>([]);
    const showToast = useCustomToast();

    const getData = useCallback(async () => {
        const res = await fetch(`/api/allowances`, { method: "GET" });
        const data = await res.json();
        setDataTable(data);

        if (data.error) {
            showToast(data.error, "error")
        }
    }, [])

    useEffect(() => {
        getData();
    }, [getData]);

    const table = useReactTable({
        data: dataTable,
        columns: [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "nama_tunjangan", header: "Name" },
            { accessorKey: "keterangan", header: "Description" },
            {
                accessorKey: "aktif",
                header: "Active",
                cell: ({ row }) => (
                    <Checkbox isChecked={row.original.aktif === 1} isReadOnly />
                ),
            },
            {
                accessorKey: "aksi",
                header: "Actions",
                cell: ({ row }) => (
                    <Menu>
                        <MenuButton as={Button} fontSize={12} size="sm" rightIcon={<TriangleDownIcon />}>

                        </MenuButton>
                        <MenuList fontSize={12}>
                            <MenuItem >Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu>
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
                                <Th key={header.id}>
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
            <HStack justify="space-between" mt="4">
                <Box display="flex" alignItems="center" >
                    <IconButton
                        aria-label='Prev'
                        onClick={() => table.previousPage()}
                        isDisabled={!table.getCanPreviousPage()}
                        mr={2}
                        icon={<ChevronLeftIcon />}
                    />
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <IconButton
                        aria-label='Next'
                        onClick={() => table.nextPage()}
                        isDisabled={!table.getCanNextPage()}
                        ml={2}
                        icon={<ChevronRightIcon />}
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

                <Button size="sm" colorScheme='red' onClick={() => router.push("/dashboard/allowances/create")}>New Allowance</Button>
            </HStack>
        </Box>
    );
}

