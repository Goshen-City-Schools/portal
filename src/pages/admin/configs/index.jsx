import ReactPortal from "../../../widgets/React_portal";
import { Box, Grid, Link as ChakraLink, Text } from "@chakra-ui/react";

import PageWrapper from "../../../components/PageWrapper";
import PageSectionHeader from "../../../components/PageSectionHeader";
import { Link } from "react-router-dom";

export default function ConfigPage() {
  const configLinks = [
    { to: "/admin/config/classes", label: "Classes" },
    { to: "/admin/config/academics", label: "Subjects" },
    { to: "/admin/config/staff", label: "Staff" },
    { to: "/admin/config/payments", label: "Results" },
    { to: "/admin/config/evaluation", label: "Academics" },
    { to: "/admin/config/finance", label: "Finance" },
    { to: "/admin/config/finance", label: "Promotion" },
  ];

  return (
    <PageWrapper>
      <ReactPortal />

      <PageSectionHeader
        pageTitle={"Configuration"}
        pageCrumb={"Home / Configure"}
      />

      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        mt="4"
        gap={4}
        w="full"
        overflowX="auto"
      >
        {configLinks.map((link, index) => (
          <Box
            key={index}
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            transition="box-shadow 0.2s"
            _hover={{ boxShadow: "lg" }}
          >
            <ChakraLink as={Link} to={link.to} textDecoration="none">
              <Text fontSize="lg" fontWeight="bold" color="brand.700">
                {link.label}
              </Text>
            </ChakraLink>
          </Box>
        ))}
      </Grid>
    </PageWrapper>
  );
}
