import { Grid, Box } from "@chakra-ui/react";

const GridViewComponent = ({
  data,
  Component,
  dataEntity,
  ...additionalProps
}) => {
  return (
    <Box>
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        mt="4"
        gap={4}
        w="full"
        overflowX="auto"
      >
        {data?.map((dataItem) => (
          <Component
            key={dataItem?.portalId}
            data={dataItem}
            {...additionalProps}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default GridViewComponent;
