import { EditIcon } from "@chakra-ui/icons";
import { MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditPostAction = ({ postId }: { postId: string }) => {
  // console.log("post id in edit Action: ", postId)
  const navigate = useNavigate();

  return (
    <MenuItem icon={<EditIcon />} onClick={() => navigate(`/myposts/edit/${postId}`)}>
      Edit Post
    </MenuItem>
  );
};

export default EditPostAction;
