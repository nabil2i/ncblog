import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UseFormSetValue } from "react-hook-form";
import { PostFormData } from "../../../entities/Post";
import { app } from "../../../firebase";

interface Props {
  setFieldValue: UseFormSetValue<PostFormData>;
  postImage?: string
}

const AddPostImage = ({ setFieldValue, postImage }: Props) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const toast = useToast();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileRealUrl, setFileRealUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState<number | null>(
    null
  );
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);

  // console.log(fileUploadProgress, fileUploadError);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target?.files?.[0];
    if (imageFile) {
      setFile(imageFile);
      setFileUrl(URL.createObjectURL(imageFile));
      setCanSubmit(true);
    }
  };

  const uploadImage = async () => {
    // console.log("uploading image...")
    try {
      if (!file) {
        setFileUploadError("Please select an image");
        setCanSubmit(false);
        return;
      }

      setFileUploading(true);
      setFileUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`uploaded bytes is ${progress}% done`);
          setFileUploadProgress(Number(progress.toFixed(0)));
        },
        () => {
          setFileUploadError("Image upload failed");
          setFileUploadProgress(null);
          setFile(null);
          setFileUrl(null);
          setFileUploading(false);
          setCanSubmit(false);
          // toast({
          //   title: "",
          //   position: "top",
          //   description: fileUploadError,
          //   duration: ms("5s"),
          // });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL);
            setFileRealUrl(downloadURL);
            setFileUploading(false);
            setFileUploadProgress(null);
            setFileUploadError(null);
            setCanSubmit(false);
            setFieldValue("img", downloadURL);
            console.log(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {fileUploadError && (
        <Alert mb="15px" mt="10px" status="error">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription>{fileUploadError}</AlertDescription>
        </Alert>
      )}
      <Flex
        my={2}
        p={2}
        gap={4}
        align="center"
        border="dashed"
        borderWidth={2}
        borderRadius="4px"
      >
        <Input
          onChange={handleImage}
          _hover={{ cursor: "pointer" }}
          pl={0}
          height="full"
          type="file"
          accept="image/*"
        />
        <Button onClick={uploadImage} disabled={!canSubmit}>
          {/* Upload image {fileUploading && <Spinner />} */}
          {fileUploadProgress ? (
            <Box width="30px" height="30px">
              <CircularProgressbar
                value={fileUploadProgress}
                text={`${fileUploadProgress || 0}%`}
              />
            </Box>
          ) : (
            "Upload Image"
          )}
        </Button>
      </Flex>
      {((fileRealUrl !== null)) && (
        <Box>
          {/* Render your Box with the image here */}
          <Box>
            <img src={fileRealUrl} alt="Uploaded Image" />
          </Box>
        </Box>
      )}
      {((fileRealUrl === null) && (postImage !== null)) && (
        <Box>
          {/* Render your Box with the image here */}
          <Box>
            <img src={postImage} alt="Uploaded Image" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddPostImage;
