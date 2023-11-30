import { useState } from "react";

import { Grid } from "@chakra-ui/react";
import Avatar from "../Avatar.component";
import UpdateAvatarButton from "../Buttons/UpdateAvatarButton";

export default function AvatarUpload({ formData, imgUrl, thisUser }) {
  const [selectedFile, setSelectedFile] = useState();

  return (
    <Grid gap={2} placeItems={"center"}>
      <Avatar
        width={108}
        height={108}
        imageUrl={
          selectedFile
            ? URL.createObjectURL(selectedFile)
            : formData[imgUrl]
            ? formData[imgUrl]
            : "/avatar.png"
        }
      />

      <UpdateAvatarButton
        selectedFile={selectedFile}
        theUser={thisUser}
        setSelectedFile={setSelectedFile}
      />
    </Grid>
  );
}
