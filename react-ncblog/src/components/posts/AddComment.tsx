import { Avatar, Flex, FormControl, Textarea } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CommentForm } from "../../entities/Comment";
import useCreateComment from "../../hooks/useCreateComment";
import { CustomButton } from "../common/CustomButton";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
// import useAuth from "../navigationbar/useAuth";

// const VARIANT_COLOR = "teal";

const AddComment = () => {
  const { _id, img } = useAuth();
  const isAuthenticated = useSelector(authSatus);
  const { id } = useParams();
  const addComment = useCreateComment(id as string, () => {
    reset();
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<CommentForm>();

  const onSubmit = (data: CommentForm) => {
    data = {
      text: data.text,
      userId: _id,
    };
    console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };

  return (
    <>
      {isAuthenticated && (
        <form>
          <Flex mt="5" align="center" gap={2}>
            <Avatar
              src={img}
              // fallback={firstname?.slice(0, 1)}
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
            <CustomButton onClick={handleSubmit(onSubmit)} disabled={!isValid}>
              <FontAwesomeIcon icon={faPaperPlane} />
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
