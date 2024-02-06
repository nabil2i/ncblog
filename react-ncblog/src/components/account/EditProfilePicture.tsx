import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ms from "ms";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useDispatch } from "react-redux";
import {
  AuthServerResponse,
  setCredentials,
} from "../../app/features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { app } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import useUpdateUserAccount from "../../hooks/useUpdateUserAccount";
import 'react-circular-progressbar/dist/styles.css';

const EditProfilePicture = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { img } = useAuth();
  // const [trueSuccess, setTrueSuccess] = useState(false);
  const [removeProfile, setRemoveProfile] = useState(false);
  // const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState< number | null>(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<string | null>(null);
  
  const [imageFileUploading, setImageFileUploading] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  let image = img;
  const defaultImg = "https://api.dicebear.com/7.x/bottts/png"

  const updateUserAccount = useUpdateUserAccount(
    (data) => {
      // console.log(data);
      dispatch(setCredentials(data as AuthServerResponse));
      toast({
        title: "",
        description: "Successfully updated your account",
        duration: ms("5s"),
        isClosable: true,
        status: "success",
        position: "top",
        icon: <EditIcon />,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    () => {
      // console.log(errorMessage);

      toast({
        title: "",
        description: "We couldn't update your account",
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
        icon: <EditIcon />,
      });
    }
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // console.log(canSubmit)

    if (imageFileUploading) return;

    if (removeProfile) {
      try {
        await deleteImage();
        setSubmitting(false);
        onClose();
      } catch(error) {
        setSubmitting(false);
      }
    }
    if (imageFile) {
      setSubmitting(true);
      setCanSubmit(false);
      try {
        await uploadImage(imageFile);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    }
  };

  // console.log(imageFileUploadProgress, imageFileUploadError);
  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setCanSubmit(true);
    }
  };

  const handleRemove = () => {
    console.log("removing the image")
    setRemoveProfile(true);
    setImageFile(null);
    setImageFileUrl(null);
    setCanSubmit(true);
    image = defaultImg
  }

  const uploadImage = async (imageFile: File) => {
    // console.log("uploading image...")
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(`uploaded bytes is ${progress}% done`);
        setImageFileUploadProgress(Number(progress.toFixed(0)));
      },
      () => {
        setImageFileUploadError(
          "Could not upload the image. You file must be less than 2MB"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
        toast({
          title: "",
          position: "top",
          description: imageFileUploadError,
          duration: ms("5s"),
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          // setTrueSuccess(true);
          updateUserAccount.mutate({ img: downloadURL });
          setImageFileUploading(false);
          setImageFileUploadProgress(null);
          setImageFileUploadError(null);
          onClose();
        });
      }
    );
  };

  const deleteImage = async () => {
    updateUserAccount.mutate({img: defaultImg});
  }

  return (
    <>
      {/* <Button onClick={onOpen} ref={finalRef}>Edit</Button> */}
      <Avatar
        src={img}
        size="2xl"
        onClick={onOpen}
        borderColor={"gray"}
        borderWidth={5}
        objectFit="cover"
        _hover={{ cursor: "pointer" }}
      />

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Change your profile picture</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Profile photo</FormLabel>
                <Flex direction="row" w="full" gap={8}>
                  <Input
                    hidden
                    name="profile"
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfile}
                  />
                  <Box
                    onClick={() => fileRef?.current?.click()}
                    _hover={{ cursor: "pointer" }}
                    position="relative"
                    // overflow="hidden"
                  >
                    {imageFileUploadProgress !== null && (
                      <CircularProgressbar
                        value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                          root: {
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          },
                          path: {
                            stroke: `rgba(65, 152, 199, ${
                              imageFileUploadProgress / 100
                            })`,
                            // strokeLinecap: 'round',
                            // transition: 'stroke-dashoffset 0.5s ease 0s',
                            // transform: 'rotate(0.25turn)',
                            //  transformOrigin: 'center center',
                          },
                        }}
                      />
                    )}
                    <Box>
                      <Avatar
                        src={imageFileUrl || image}
                        size="2xl"
                        borderColor={"gray"}
                        borderWidth={imageFileUploadProgress ? 0 : 5}
                        objectFit="cover"
                        opacity={
                          imageFileUploadProgress &&
                          imageFileUploadProgress < 100
                            ? "20%"
                            : "100%"
                        }
                      />
                    </Box>
                  </Box>

                  <Flex direction="column" gap={1}>
                    <Flex gap={2}>
                      <Text
                        _hover={{ cursor: "pointer" }}
                        color="teal"
                        onClick={() => fileRef?.current?.click()}
                      >
                        Update
                      </Text>
                      <Text _hover={{ cursor: "pointer" }} color="red"
                        onClick={handleRemove}
                      >
                        Remove
                      </Text>
                    </Flex>
                    <Box color="gray">
                      Recommended: Square JPG, PNG, or GIF, at most 2MB.
                    </Box>
                  </Flex>
                </Flex>
              </FormControl>

              <FormErrorMessage>
                {imageFileUploadError && imageFileUploadError}
              </FormErrorMessage>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                type="submit"
                mr={3}
                disabled={!canSubmit}
              >
                Save {isSubmitting && <Spinner />}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfilePicture;
