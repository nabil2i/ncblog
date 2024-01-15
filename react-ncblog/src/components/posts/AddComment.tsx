import { Avatar, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuth from "../navigationbar/useAuth";
import useCreateComment from "../../hooks/useCreateComment";
import { CommentForm } from "../../entities/Comment";
import { useParams } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const VARIANT_COLOR = "teal";


const AddComment = () => {
  const { userData } = useAuth();
  const { id } = useParams();
  const addComment = useCreateComment(
    id as string,
    () => {
      reset();
    }
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<CommentForm>();

  const onSubmit = (data: CommentForm) => {
    data = {
      text: data.text,
      userId: userData._id as string,
    }
    console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };
  
  return (
    <>{userData.isAuthenticated && (
      <form>
        <Flex mt="5" align="center" gap={2}>
          <Avatar
              src={userData.img}
              // fallback={comment.user.firstname?.slice(0, 1)}
              size="md"
              // radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          <FormControl
            // isRequired isInvalid={errors.comment ? true : false}
          >
              <Textarea
                focusBorderColor="teal.500"
                placeholder="Add a comment..."
                {...register("text", {
                  required: true,
                })}
              />
            
          </FormControl>
          <CustomButton
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <FontAwesomeIcon icon={faPaperPlane}/>
          </CustomButton>
          {/* <Button
            // mt={4}
            type="submit"
            // disabled={}
            colorScheme={VARIANT_COLOR}
          >
            Comment
          </Button> */}
        </Flex>
      </form>
    )}
    </>

  );
};

export default AddComment;
