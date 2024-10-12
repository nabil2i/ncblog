import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  selectNotification,
} from "../../app/features/notification/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(selectNotification);

  if (!message) return null;

  return (
    <Box position="fixed" top="1rem" right="1rem" zIndex="9999">
      <Alert status={type}>
        <AlertIcon />
        {message}
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => dispatch(clearNotification())}
        />
      </Alert>
    </Box>
  );
};

export default Notification;
