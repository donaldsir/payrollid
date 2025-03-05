'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useCustomToast } from "@/app/lib/toast";
import {
    Flex, Heading, Checkbox, Divider, FormControl, FormLabel, Input, Spacer, Button
} from '@chakra-ui/react'
import LoadingOverlay from "@/app/lib/loading_overlay";

export default function Page() {
    const [nama_tunjangan, setNamaTunjangan] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [aktif, setAktif] = useState(1)
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    const showToast = useCustomToast();

    const params = useParams()
    const id = params?.id;

    const getData = useCallback(async () => {
        setLoading(true)
        if (!id) return;

        try {
            const res = await fetch(`/api/allowances/${id}`, { method: 'GET' });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            if (data.error) {
                showToast(data.error, "error");
                return;
            }

            setNamaTunjangan(data?.nama_tunjangan || "");
            setKeterangan(data?.keterangan || "");
            setAktif(parseInt(data?.aktif) || 0);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            showToast("Terjadi kesalahan saat mengambil data", "error");
        }
    }, [id])

    useEffect(() => {
        getData()
    }, [getData]);

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nama_tunjangan', nama_tunjangan)
        formData.append('keterangan', keterangan)
        formData.append('aktif', aktif.toString())

        try {
            const res = await fetch(`/api/allowances/${id}`, {
                method: "PUT",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                showToast(data.message, "success")
                router.back()
            } else {
                showToast(data.error, "error")
            }
        } catch (error) {
            if (typeof error === "string") {
                console.error("Error updating data:", error.toUpperCase());
            } else if (error instanceof Error) {
                console.error("Error updating data:", error.message);
            }
            showToast("Error updating data:", "error");
        }
    }

    return (
        <form onSubmit={(e) => { update(e) }}>
            {loading && <LoadingOverlay />}
            <Heading as='h5' size='sm'>Edit Allowance</Heading>
            <Divider borderColor="crimson" borderWidth="2px" my={4} />
            <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
                <FormControl flex="2" isRequired>
                    <FormLabel fontSize="sm">Allowance Name</FormLabel>
                    <Input size="sm" type='text' value={nama_tunjangan} onChange={(e) => { setNamaTunjangan(e.target.value) }} />
                </FormControl>

                <FormControl flex="4">
                    <FormLabel fontSize="sm">Description</FormLabel>
                    <Input size="sm" type='text' value={keterangan} onChange={(e) => { setKeterangan(e.target.value) }} />
                </FormControl>

                <FormControl flex="1" display="flex" alignItems="center" mt={{ base: 0, md: 6 }}>
                    <Checkbox onChange={(e) => setAktif(e.target.checked ? 1 : 0)} isChecked={aktif === 1} colorScheme='red'>Active</Checkbox>
                </FormControl>
            </Flex>

            <Divider borderColor="crimson" borderWidth="2px" my={4} />

            <Flex>
                <Button size="sm" colorScheme='red' variant="outline" onClick={() => router.back()}>Back</Button>
                <Spacer />
                <Button size="sm" colorScheme='red' type='submit' >Save</Button>
            </Flex>
        </form>
    )
}