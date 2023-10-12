import React from "react";
import { motion } from "framer-motion";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../screens/Loading.screen";
import defaultConfigValues from "../data/defaultConfigValues";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PageWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a few seconds (adjust this as needed)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen height="92vh" timer={2100} />
      ) : (
        <Box p={6}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={defaultConfigValues.pageVariants}
          >
            {children}
          </motion.div>
        </Box>
      )}
    </>
  );
}
