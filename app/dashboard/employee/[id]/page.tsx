"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCustomToast } from "@/app/lib/toast";
import {
  Flex,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Grid,
  Select,
  Card,
  CardBody,
  IconButton,
  RadioGroup,
  Radio,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { dateMySql, list_bpjs_employment } from "@/app/lib/helpers";
import { Allowances, EmployeeAllowance } from "@/app/interfaces";
import { BiTrash } from "react-icons/bi";
import LoadingOverlay from "@/app/lib/loading_overlay";

export default function Page() {
  const [nama_pegawai, setNamaPegawai] = useState("");
  const [tgl_join, setTglJoin] = useState(dateMySql(new Date()));
  const [jabatan, setJabatan] = useState("");
  const [status, setStatus] = useState(0);
  const [tipe_pajak, setTipePajak] = useState("0");
  const [tanggungan, setTanggungan] = useState(0);
  const [gaji_pokok, setGajiPokok] = useState(0);
  const [npwp, setNPWP] = useState(0);
  const [bpjs_health, setBPJSHealth] = useState(0);
  const [bpjs_employment, setBPJSEmployment] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [id_tunjangan, setIdTunjangan] = useState(0);
  const [tunjangan, setTunjangan] = useState<Array<Allowances>>([]);
  const [tunjangan_pegawai, setTunjanganPegawai] = useState<Array<EmployeeAllowance>>([]);
  const [loading, setLoading] = useState(false);

  const marital_status = [
    { id: 0, label: "Single (TK)" },
    { id: 1, label: "Married (K)" },
  ];

  const router = useRouter();
  const showToast = useCustomToast();

  const params = useParams();
  const id = params?.id;

  const getData = useCallback(async () => {
    setLoading(true);
    if (!id) return;

    const resAllowance = await fetch(`/api/allowances`, { method: "GET" });
    const dataAllowance = await resAllowance.json();

    if (dataAllowance.length > 0) {
      setIdTunjangan(dataAllowance[0].id);
      setTunjangan(dataAllowance);
    }

    const res = await fetch(`/api/employee/${id}`, { method: "GET" });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      showToast(data.error, "error");
      return;
    }

    setNamaPegawai(data?.pegawai.nama_pegawai || "");
    setTglJoin(dateMySql(data?.pegawai.tgl_join) || dateMySql(new Date()));
    setJabatan(data?.pegawai.jabatan || "");
    setTipePajak(data?.pegawai.tipe_pajak || 0);
    setStatus(data?.pegawai.status || 0);
    setTanggungan(data?.pegawai.tanggungan || 0);
    setGajiPokok(data?.pegawai.gaji_pokok || 0);
    setNPWP(data?.pegawai.npwp || 0);
    setBPJSHealth(data?.pegawai.bpjs_health || 0);
    setBPJSEmployment(data?.pegawai.bpjs_employment || 0);
    setTunjanganPegawai(data?.tunjangan_pegawai || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  function getAllowanceById(id: number) {
    return tunjangan.find((tunjangan) => tunjangan.id === id) || null;
  }

  const insertAllowance = () => {
    const filtered = tunjangan_pegawai.filter((tunjangan_pegawai) => tunjangan_pegawai.id_tunjangan === id_tunjangan);

    if (filtered.length === 0) {
      const newItem: EmployeeAllowance = {
        id: 0,
        id_pegawai: 0,
        id_tunjangan: id_tunjangan,
        nominal: nominal,
      };
      setTunjanganPegawai((prev) => [...prev, newItem]);
    } else {
      showToast("Duplicate entry", "error");
    }
  };

  const deleteAllowance = (id: number) => {
    setTunjanganPegawai(tunjangan_pegawai.filter((tunjangan_pegawai) => tunjangan_pegawai.id_tunjangan !== id));
  };

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_pegawai", nama_pegawai);
    formData.append("tgl_join", tgl_join);
    formData.append("jabatan", jabatan);
    formData.append("tipe_pajak", tipe_pajak);
    formData.append("status", status.toString());
    formData.append("tanggungan", tanggungan.toString());
    formData.append("gaji_pokok", gaji_pokok.toString());
    formData.append("npwp", npwp.toString());
    formData.append("bpjs_health", bpjs_health.toString());
    formData.append("bpjs_employment", bpjs_employment.toString());
    formData.append("tunjangan_pegawai", JSON.stringify(tunjangan_pegawai));
    console.log(JSON.stringify(tunjangan_pegawai));

    try {
      const res = await fetch(`/api/employee/${id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        showToast(data.message, "success");
        router.back();
      } else {
        showToast(data.error, "error");
      }
    } catch (error) {
      if (typeof error === "string") {
        console.error("Error inserting data:", error.toUpperCase());
      } else if (error instanceof Error) {
        console.error("Error inserting data:", error.message);
      }
      showToast("Error inserting data:", "error");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        update(e);
      }}
    >
      {loading && <LoadingOverlay />}
      <Heading as="h5" size="sm">
        Edit Employee
      </Heading>
      <Divider borderColor="crimson" borderWidth="2px" my={4} />
      <Card border="1px" borderColor="gray">
        <CardBody>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Mobile: 1 kolom, Desktop: 2 kolom
            gap={6} // Jarak antar kolom
          >
            <Box>
              <FormLabel fontSize="sm">Employee Name</FormLabel>
              <Input
                size="sm"
                type="text"
                value={nama_pegawai}
                onChange={(e) => {
                  setNamaPegawai(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel fontSize="sm">Join Date</FormLabel>
              <Input
                size="sm"
                type="date"
                value={tgl_join}
                onChange={(e) => {
                  setTglJoin(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel fontSize="sm">Designation</FormLabel>
              <Input
                size="sm"
                type="text"
                value={jabatan}
                onChange={(e) => {
                  setJabatan(e.target.value);
                }}
              />
            </Box>
            <Box>
              <FormLabel fontSize="sm">Tax paid by</FormLabel>
              <Flex align="center" gap={4}>
                {/* Gunakan Flex untuk menyusun elemen sejajar */}
                <RadioGroup onChange={setTipePajak} value={tipe_pajak}>
                  <Stack direction="row">
                    <Radio value="0" size="sm">
                      Employee
                    </Radio>
                    <Radio value="1" size="sm">
                      Company
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Checkbox
                  size="sm"
                  onChange={(e) => setNPWP(e.target.checked ? 1 : 0)}
                  isChecked={npwp === 1}
                  colorScheme="red"
                  ml={4}
                >
                  NPWP
                </Checkbox>
              </Flex>
            </Box>

            <Box>
              <FormLabel fontSize="sm">Marital Status</FormLabel>
              <Select size="sm" value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
                {marital_status.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.label}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel fontSize="sm">Number of Dependents</FormLabel>
              <Input
                size="sm"
                type="number"
                value={tanggungan}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setTanggungan(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </Box>
            <Box>
              <FormLabel fontSize="sm">BPJS Employment</FormLabel>
              <Flex align="center" gap={4}>
                <Select
                  size="sm"
                  value={bpjs_employment}
                  onChange={(e) => setBPJSEmployment(parseInt(e.target.value))}
                  flex={4}
                >
                  {list_bpjs_employment.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.label}
                    </option>
                  ))}
                </Select>
                <Checkbox
                  size="sm"
                  onChange={(e) => setBPJSHealth(e.target.checked ? 1 : 0)}
                  isChecked={bpjs_health === 1}
                  colorScheme="red"
                  flex={2} // Membuat checkbox lebih panjang
                >
                  BPJS Health
                </Checkbox>
              </Flex>
            </Box>
            <Box>
              <FormLabel fontSize="sm">Basic Salary</FormLabel>
              <Input
                size="sm"
                type="number"
                value={gaji_pokok}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setGajiPokok(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </Box>
          </Grid>
        </CardBody>
      </Card>

      <Card mt={4} border="1px" borderColor="gray">
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
            <FormControl flex="2">
              <FormLabel fontSize="sm">Allowance</FormLabel>
              <Select size="sm" value={id_tunjangan} onChange={(e) => setIdTunjangan(parseInt(e.target.value))}>
                {tunjangan.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.nama_tunjangan}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl flex="2">
              <FormLabel fontSize="sm">Amount</FormLabel>
              <Input
                size="sm"
                type="number"
                value={nominal}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setNominal(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </FormControl>
            <FormControl flex="1" display="flex" alignItems="center" mt={{ base: 0, md: 6 }}>
              <Button size="sm" colorScheme="red" onClick={insertAllowance}>
                Insert
              </Button>
            </FormControl>
          </Flex>

          <Box overflowX="auto">
            <Table variant="striped" size="sm" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Allowance</Th>
                  <Th textAlign="right">Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tunjangan_pegawai.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <IconButton
                        size="xs"
                        aria-label="Delete"
                        icon={<BiTrash />}
                        colorScheme="red"
                        onClick={() => deleteAllowance(row.id_tunjangan)}
                      />
                    </Td>
                    <Td>{getAllowanceById(row.id_tunjangan)?.nama_tunjangan}</Td>
                    <Td textAlign="right">{row.nominal.toLocaleString("id-ID")}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
      <Divider borderColor="crimson" borderWidth="2px" my={4} />
      <Flex>
        <Button size="sm" colorScheme="red" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Spacer />
        <Button size="sm" colorScheme="red" type="submit">
          Save
        </Button>
      </Flex>
    </form>
  );
}
