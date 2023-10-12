import React from "react";
import { motion } from "framer-motion";

import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../screens/Loading.screen";
import defaultConfigValues from "../data/defaultConfigValues";
import { useNavigate } from "react-router-dom";

export default function PageWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = defaultConfigValues.user;

  useEffect(() => {
    // Simulate loading for a few seconds (adjust this as needed)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);

  if (user && user.userType === "Staff" && window.location.pathname === "/") {
    // If the user is logged in as Staff and is at the base route '/', redirect them to '/admin'
    return navigate("/admin");
  }

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
      )
    </>
  );
}
