'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Flex, Heading, Divider, FormControl, FormLabel, Input, Box, Button, Select,
    InputGroup, InputRightElement, Modal, ModalHeader, ModalBody, ModalFooter,
    ModalContent, ModalOverlay, useDisclosure, Table, Thead, Tbody,
    Tr, Th, Td, IconButton, SimpleGrid, Text, Grid, GridItem, Checkbox
} from '@chakra-ui/react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender
} from "@tanstack/react-table";
import { GrCaretPrevious, GrCaretNext, GrCheckmark, GrEdit } from "react-icons/gr"
import { FaSearch } from "react-icons/fa";
import LoadingOverlay from "@/app/lib/loading_overlay";
import { Employee } from "@/app/interfaces";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pegawai, setPegawai] = useState<Array<Employee>>([])
    const [id_pegawai, setIdPegawai] = useState(0)
    const [nama_pegawai, setNamaPegawai] = useState('')
    const [nama_tunjangan, setNamaTunjangan] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [detail_bruto, setDetailBruto] = useState([])
    const [tahun, setTahun] = useState(new Date().getFullYear())
    const [bulan, setBulan] = useState(new Date().getMonth())
    const [pph, setPPH] = useState(0)
    const [edit_amount, setEditAmount] = useState(0)
    const modal1 = useDisclosure(); // State untuk modal pertama
    const modal2 = useDisclosure();
    const [filter, setFilter] = useState("")
    const [pageSize, setPageSize] = useState(10)

    const months = [
        { id: 0, label: "January" },
        { id: 1, label: "February" },
        { id: 2, label: "March" },
        { id: 3, label: "April" },
        { id: 4, label: "May" },
        { id: 5, label: "June" },
        { id: 6, label: "July" },
        { id: 7, label: "August" },
        { id: 8, label: "September" },
        { id: 9, label: "October" },
        { id: 10, label: "November" },
        { id: 11, label: "December" },
    ];

    function getMonthName(id: number) {
        return months.find((bulan) => bulan.id === id) || null;
    }

    const getData = useCallback(async () => {
        setLoading(true)
        const res = await fetch(`/api/employee`, { method: "GET" });
        const data = await res.json();
        setPegawai(data);
        setLoading(false)
    }, [])

    useEffect(() => {
        getData();
    }, [getData]);

    const table = useReactTable({
        data: pegawai,
        columns: [
            {
                accessorKey: "aksi",
                header: "Select",
                cell: ({ row }) => (
                    <IconButton
                        colorScheme='red'
                        aria-label='Select'
                        size='xs'
                        icon={<GrCheckmark />}
                        onClick={() => selectPegawai(row.original.id)}
                    />
                ),
            },
            { accessorKey: "nama_pegawai", header: "Name" },
            { accessorKey: "jabatan", header: "Designation" },
        ],
        state: { globalFilter: filter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } },
    });

    const selectPegawai = async (id: number) => {
        const filtered = pegawai.filter(dt => dt.id === id);

        const res = await fetch(`/api/employee/${id}/allowances`, { method: "GET" });
        const data = await res.json();

        setDetailBruto(data)
        setIdPegawai(id);
        setNamaPegawai(filtered[0].nama_pegawai)
        setJabatan(filtered[0].jabatan)
        modal1.onClose()
    }

    const modalNominal = (dt: any) => {
        setNamaTunjangan(dt.nama_tunjangan)
        setEditAmount(dt.nominal)
        modal2.onOpen()
    }

    const changeAmount = () => {
        setDetailBruto((prevItems: any) =>
            prevItems.map((item: any) =>
                item.nama_tunjangan === nama_tunjangan ? { ...item, nominal: edit_amount } : item
            )
        );

        modal2.onClose()
    }

    const calculate = async () => {
        setLoading(true);
        const bruto = detail_bruto.reduce((sum: number, row: any) => sum + row.nominal, 0);

        const formData = new FormData();
        formData.append("id_pegawai", id_pegawai.toString());
        formData.append("bruto", bruto.toString());

        const res = await fetch(`/api/employee/${id_pegawai}/payslip`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        setPPH(data)
        setLoading(false)
    }

    return (
        <>
            {loading && <LoadingOverlay />}
            <Heading as='h5' size='sm'>PAYSLIP</Heading>
            <Divider borderColor="crimson" borderWidth="2px" my={4} />

            <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
                <FormControl flex="1" isRequired>
                    <FormLabel fontSize="sm">Year</FormLabel>
                    <Input
                        size="sm"
                        type="number"
                        value={tahun}
                        onChange={(e) => {
                            const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                            setTahun(value === "" ? 0 : parseInt(value, 10));
                        }}
                    />
                </FormControl>
                <FormControl flex="2" isRequired>
                    <FormLabel fontSize="sm">Month</FormLabel>
                    <Select size="sm" value={bulan} onChange={(e) => setBulan(parseInt(e.target.value))}>
                        {months.map((row) => (
                            <option key={row.id} value={row.id}>
                                {row.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl flex="3" isRequired>
                    <FormLabel fontSize="sm">Employee</FormLabel>
                    <InputGroup>
                        <Input size="sm" value={nama_pegawai} onChange={() => { }} isReadOnly />
                        <InputRightElement boxSize={8}>
                            <FaSearch color='crimson' onClick={modal1.onOpen} />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Flex>

            <Box overflowX="auto">
                <Table variant="striped" size="sm" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th ></Th>
                            <Th>Payroll Component</Th>
                            <Th>Non-Taxable (PTKP)</Th>
                            <Th textAlign="right">Amount</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {detail_bruto.map((row: any, index) => (
                            <Tr key={index}>
                                <Td textAlign="center">
                                    <IconButton
                                        size="xs"
                                        aria-label="Edit Amount"
                                        icon={<GrEdit />}
                                        onClick={() => modalNominal(row)}
                                        colorScheme="red"
                                    />
                                </Td>
                                <Td>{row.nama_tunjangan}</Td>
                                <Td>
                                    <Box display="flex" justifyContent="center">
                                        <Checkbox isChecked={row.ptkp === 1} colorScheme="red" isReadOnly />
                                    </Box>
                                </Td>

                                <Td textAlign="right">{row.nominal.toLocaleString('id-ID')}</Td>
                            </Tr>
                        ))}
                        <Tr>
                            <Td fontWeight="bold" colSpan={3}>Total Bruto</Td>
                            <Td textAlign="right" fontWeight="bold">{detail_bruto.reduce((sum: number, row: any) => sum + row.nominal, 0).toLocaleString('id-ID')}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>

            <FormControl flex="1" display="flex" alignItems="center" mt={{ base: 0, md: 6 }}>
                <Button size="sm" colorScheme="red" onClick={calculate} disabled={id_pegawai ? false : true}>
                    Calculate
                </Button>
            </FormControl>

            <SimpleGrid column={1} mt={4} background="gray.50" p={4}>
                <Text fontSize='sm' textAlign="center" fontWeight="bold">Payslip - {getMonthName(bulan)?.label} {tahun}</Text>
                <Heading size="sm" textAlign="center">{nama_pegawai}</Heading>
                <Text fontSize='sm' textAlign="center">{jabatan}</Text>
            </SimpleGrid>

            <Grid templateColumns='repeat(2, 1fr)' gap={4} mt={4} >
                <GridItem background="gray.50" p={4}>
                    <Heading size='xs' mb={2}>EARNINGS</Heading>
                    {detail_bruto.map((row: any, index) => (
                        <Grid key={index} templateColumns='repeat(2, 1fr)' gap={10} p={1}>
                            <GridItem><Text fontSize="sm">{row.nama_tunjangan}</Text></GridItem>
                            <GridItem><Text fontSize="sm" textAlign="right">{row.nominal.toLocaleString('id-ID')}</Text></GridItem>
                        </Grid>
                    ))}
                </GridItem >
                <GridItem background="gray.50" p={4}>
                    <Heading size='xs' mb={2}>DEDUCTIONS</Heading>
                    <Grid templateColumns='repeat(2, 1fr)' gap={10} p={1} >
                        <GridItem><Text fontSize="sm">Tax Income (PPh)</Text></GridItem>
                        <GridItem><Text fontSize="sm" textAlign="right">{pph.toLocaleString('id-ID')}</Text></GridItem>
                    </Grid>
                </GridItem >
            </Grid >

            <Grid templateColumns='repeat(2, 1fr)' gap={4} >
                <GridItem background="gray.100" p={4}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={10} p={1}>
                        <GridItem><Text fontSize="sm" fontWeight="bold">TOTAL EARNINGS</Text></GridItem>
                        <GridItem><Text fontSize="sm" fontWeight="bold" textAlign="right">{detail_bruto.reduce((sum: number, row: any) => sum + row.nominal, 0).toLocaleString('id-ID')}</Text></GridItem>
                    </Grid>
                </GridItem >
                <GridItem background="gray.100" p={4}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={10} p={1}>
                        <GridItem><Text fontSize="sm" fontWeight="bold">TOTAL DEDUCTIONS</Text></GridItem>
                        <GridItem><Text fontSize="sm" fontWeight="bold" textAlign="right">{pph.toLocaleString('id-ID')}</Text></GridItem>
                    </Grid>
                </GridItem >
            </Grid >
            <Grid templateColumns='repeat(2, 1fr)' gap={10} p={3} mt={6} background="red.700" color="white">
                <GridItem><Heading fontWeight="bold" size="md">TAKE HOME PAY</Heading></GridItem>
                <GridItem><Heading fontWeight="bold" size="md" textAlign="right">{(detail_bruto.reduce((sum: number, row: any) => sum + row.nominal, 0) - pph).toLocaleString('id-ID')}</Heading></GridItem>
            </Grid>

            <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="sm">List of Employee</ModalHeader>
                    <ModalBody>
                        <Box overflowX="auto">
                            {/* Tabel */}
                            <Table variant='striped' size="sm" colorScheme="gray">
                                <Thead >
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <Tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <Th key={header.id} >
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
                            <Box display="flex" mt={4} alignItems="center" justifyContent={{ base: "center", md: "flex-start" }} mb={{ base: 4, md: 0 }}>
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
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button size="sm" variant="outline" colorScheme='red' mr={3} onClick={modal1.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
                <ModalContent>
                    <ModalHeader fontSize="sm">{nama_pegawai} - {nama_tunjangan}</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel fontSize="sm">Amount </FormLabel>
                            <Input
                                size="sm"
                                type="number"
                                value={edit_amount}
                                onChange={(e) => {
                                    const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                                    setEditAmount(value === "" ? 0 : parseInt(value, 10));
                                }}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" variant="outline" colorScheme='red' mr={2} onClick={modal2.onClose}>
                            Close
                        </Button>
                        <Button size="sm" colorScheme='red' onClick={changeAmount}>
                            Change
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}