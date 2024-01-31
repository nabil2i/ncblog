import { Button, Flex, useToast } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import ms from "ms";
import { useEffect } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGoogleMutation } from "../../app/features/auth/authApiSlice";
import { setCredentials } from "../../app/features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { firebaseAuth } from "../../firebase";

const OAuth = () => {
  const [google, { isError }] = useGoogleMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "",
        description: "Could not sign in",
        // description: error,
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      const name = result.user.displayName;
      const email = result.user.email;
      const photo = result.user.photoURL;
      // console.log(result.user);

      const data = await google({ name, email, photo }).unwrap();
      // console.log(data)
      dispatch(setCredentials(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w="full">
      <Button
        colorScheme="red"
        width="full"
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
    </Flex>
  );
};

export default OAuth;
