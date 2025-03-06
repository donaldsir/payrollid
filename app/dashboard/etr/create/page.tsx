"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/lib/toast";
import {
  Flex,
  Heading,
  Select,
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
  IconButton,
  Card,
  CardBody,
  Box
} from "@chakra-ui/react";
import { ETRPTKP, ETRBruto } from "@/app/interfaces";
import { BiTrash } from "react-icons/bi";
import LoadingOverlay from "@/app/lib/loading_overlay";
import * as XLSX from "xlsx";

export default function Page() {
  const [nama_etr, setNamaETR] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [status, setStatus] = useState(0);
  const [tanggungan, setTanggungan] = useState(0);
  const [nilai_ptkp, setNilaiPTKP] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [maksimum, setMaksimum] = useState(0);
  const [persentasi, setPersentasi] = useState(0);
  const [etr_ptkp, setETRPTKP] = useState<Array<ETRPTKP>>([]);
  const [etr_bruto, setETRBruto] = useState<Array<ETRBruto>>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const showToast = useCustomToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const marital_status = [
    { id: 0, label: "Single (TK)" },
    { id: 1, label: "Married (K)" },
  ];

  function getMaritalStatusById(id: number) {
    return marital_status.find((status) => status.id === id) || null;
  }

  const reset = () => {
    setNamaETR("");
    setKeterangan("");
    setTanggungan(0);
    setETRPTKP([]);
    setETRBruto([]);
  };

  const insertPTKP = async () => {
    const filtered = etr_ptkp.filter(etr_ptkp => etr_ptkp.status === status && etr_ptkp.tanggungan === tanggungan);

    if (filtered.length === 0) {
      const newItem: ETRPTKP = {
        id: Date.now(),
        id_etr: 0,
        status: status,
        tanggungan: tanggungan,
        ptkp: nilai_ptkp,
      };
      setETRPTKP((prev) => [...prev, newItem]);
    } else {
      showToast("Duplicate entry", "error")
    }
  };

  const insertBruto = () => {
    const filtered = etr_bruto.filter(etr_bruto => etr_bruto.minimum === minimum && etr_bruto.maksimum === maksimum);

    if (filtered.length === 0) {
      const newItem: ETRBruto = {
        id: Date.now(),
        id_etr: 0,
        minimum: minimum,
        maksimum: maksimum,
        persentasi: persentasi,
      };
      setMinimum(maksimum + 1);
      setETRBruto((prev) => [...prev, newItem]);
    } else {
      showToast("Duplicate entry", "error")
    }

  };

  const deletePTKP = (id: number) => {
    setETRPTKP(etr_ptkp.filter((etr_ptkp) => etr_ptkp.id !== id));
  };

  const deleteBruto = (id: number) => {
    setETRBruto(etr_bruto.filter((etr_bruto) => etr_bruto.id !== id));
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet) as any[];

      let newItems: ETRBruto[] = [];
      for (let i = 0; i < sheetData.length; i++) {
        let cols = Object.keys(sheetData[i] as string);
        const newItem: ETRBruto = {
          id: Date.now(),
          id_etr: 0,
          minimum: sheetData[i][cols[0]] ? parseFloat(sheetData[i][cols[0]]) : 0,
          maksimum: sheetData[i][cols[1]] ? parseFloat(sheetData[i][cols[1]]) : 0,
          persentasi: sheetData[i][cols[1]] ? parseFloat(sheetData[i][cols[2]]) * 100 : 0,
        };
        newItems.push(newItem);
      }

      const uniqueItems = newItems.filter((item, index, self) =>
        index === self.findIndex(u => u.minimum === item.minimum && u.maksimum === item.maksimum)
      );

      setETRBruto(uniqueItems);
    };

    reader.readAsBinaryString(file);
  };

  const store = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nama_etr", nama_etr);
    formData.append("keterangan", keterangan);
    formData.append("etr_ptkp", JSON.stringify(etr_ptkp));
    formData.append("etr_bruto", JSON.stringify(etr_bruto));

    try {
      const res = await fetch("/api/etr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setLoading(false);
      if (data.success) {
        showToast(data.message, "success");
        reset();
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
    <form onSubmit={(e) => { store(e); }}>
      {loading && <LoadingOverlay />}
      <Heading as="h5" size="sm">
        New Effective Tax Rate
      </Heading>
      <Divider borderColor="crimson" borderWidth="2px" my={4} />
      <Card border="1px" borderColor="gray">
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
            <FormControl flex="2" isRequired>
              <FormLabel fontSize="sm">Effective Tax Rate Name</FormLabel>
              <Input
                size="sm"
                type="text"
                value={nama_etr}
                onChange={(e) => {
                  setNamaETR(e.target.value);
                }}
              />
            </FormControl>

            <FormControl flex="4">
              <FormLabel fontSize="sm">Description</FormLabel>
              <Input
                size="sm"
                type="text"
                value={keterangan}
                onChange={(e) => {
                  setKeterangan(e.target.value);
                }}
              />
            </FormControl>
          </Flex>
        </CardBody>
      </Card>

      <Card mt={4} border="1px" borderColor="gray">
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
            <FormControl flex="2">
              <FormLabel fontSize="sm">Marital Status</FormLabel>
              <Select size="sm" value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
                {marital_status.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl flex="2">
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
            </FormControl>

            <FormControl flex="2">
              <FormLabel fontSize="sm">Non-Taxable Income</FormLabel>
              <Input
                size="sm"
                type="number"
                value={nilai_ptkp}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setNilaiPTKP(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </FormControl>
            <FormControl flex="1" display="flex" alignItems="center" mt={{ base: 0, md: 6 }}>
              <Button size="sm" colorScheme="red" onClick={insertPTKP}>
                Insert
              </Button>
            </FormControl>
          </Flex>

          <Box overflowX="auto">
            <Table variant="striped" size="sm" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Marital Status</Th>
                  <Th textAlign="right">Number of Dependents</Th>
                  <Th textAlign="right">Non-Taxable Income</Th>
                </Tr>
              </Thead>
              <Tbody>
                {etr_ptkp.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <IconButton
                        size="xs"
                        aria-label="Delete"
                        icon={<BiTrash />}
                        colorScheme="red"
                        onClick={() => deletePTKP(row.id)}
                      />
                    </Td>
                    <Td>{getMaritalStatusById(row.status)?.label}</Td>
                    <Td textAlign="right">{row.tanggungan}</Td>
                    <Td textAlign="right">{row.ptkp.toLocaleString("id-ID")}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

        </CardBody>
      </Card>

      <Card mt={4} border="1px" borderColor="gray">
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4} my={6} alignItems="center">
            <FormControl flex="2">
              <FormLabel fontSize="sm">Minimum Taxable Income</FormLabel>
              <Input
                size="sm"
                type="number"
                value={minimum}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setMinimum(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </FormControl>

            <FormControl flex="2">
              <FormLabel fontSize="sm">Maximum Taxable Income</FormLabel>
              <Input
                size="sm"
                type="number"
                value={maksimum}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setMaksimum(value === "" ? 0 : parseInt(value, 10));
                }}
              />
            </FormControl>

            <FormControl flex="2">
              <FormLabel fontSize="sm">Percentage (%)</FormLabel>
              <Input
                size="sm"
                type="number"
                value={persentasi}
                onChange={(e) => {
                  const value = e.target.value.trim(); // Hapus spasi di awal & akhir
                  setPersentasi(value === "" ? 0 : parseFloat(value));
                }}
              />
            </FormControl>
            <FormControl flex="1" display="flex" alignItems="center" mt={{ base: 0, md: 6 }}>
              <Button size="sm" colorScheme="red" onClick={insertBruto}>
                Insert
              </Button>
              <Input type="file" ref={inputRef} onChange={handleFileChange} hidden />
              <Button size="sm" colorScheme="green" onClick={handleButtonClick} ml={1}>
                Import Excel
              </Button>
            </FormControl>
          </Flex>

          <Box overflowX="auto">
            <Table variant="striped" size="sm" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th textAlign="right">Minimum Taxable Income</Th>
                  <Th textAlign="right">Maximum Taxable Income</Th>
                  <Th textAlign="right">Percentage</Th>
                </Tr>
              </Thead>
              <Tbody>
                {etr_bruto.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <IconButton
                        size="xs"
                        aria-label="Delete"
                        icon={<BiTrash />}
                        onClick={() => deleteBruto(row.id)}
                        colorScheme="red"
                      />
                    </Td>
                    <Td textAlign="right">{row.minimum.toLocaleString("id-ID")}</Td>
                    <Td textAlign="right">{row.maksimum.toLocaleString("id-ID")}</Td>
                    <Td textAlign="right">{row.persentasi.toLocaleString("id-ID")}</Td>
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
