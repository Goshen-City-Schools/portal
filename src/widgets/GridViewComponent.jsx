import { Grid } from "@chakra-ui/react";

const GridViewComponent = ({
  data,
  Component,
  dataEntity,
  ...additionalProps
}) => {
  return (
    <Grid
      gridTemplateColumns={{
        "base": "1fr",
        "sm": "1fr, 1fr",
        "md": "repeat(3, 1fr)",
        "lg": "repeat(5, 1fr)",
      }}
      mt={"4"}
      gap={4}
    >
      {data?.map((dataItem) => (
        <Component
          key={dataItem?.portalId}
          data={dataItem}
          {...additionalProps}
        />
      ))}
    </Grid>
  );
};

export default GridViewComponent;
