'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCustomToast } from "@/app/lib/toast";
import {
    Flex, Heading, Checkbox, Divider, FormControl, FormLabel, Input, Spacer, Button
} from '@chakra-ui/react'

export default function Page() {
    const [nama_tunjangan, setNamaTunjangan] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [aktif, setAktif] = useState(1)

    const router = useRouter()
    const showToast = useCustomToast();

    const reset = () => {
        setNamaTunjangan('')
        setKeterangan('')
        setAktif(1)
    }

    const store = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('nama_tunjangan', nama_tunjangan)
        formData.append('keterangan', keterangan)
        formData.append('aktif', aktif.toString())

        const res = await fetch("/api/allowances", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.success) {
            showToast("Saved successfully", "success")
            reset()
        } else {
            showToast(data.error, "error")
        }
    }

    return (
        <form onSubmit={(e) => { store(e) }}>
            <Heading as='h5' size='sm'>New Allowance</Heading>
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