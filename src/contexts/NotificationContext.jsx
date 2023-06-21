import { Button, IconButton, Snackbar, Typography } from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { createContext } from "react";

const NotificationContext = createContext();

// type Notification = {
//   msg: string;
//   action?: {
//     btnText?: string;
//     onClick?: () => void;
//     closable?: boolean;
//   } | null;
//   anchorOrigin?: {
//     vertical: 'top' | 'bottom';
//     horizontal: 'left' | 'center' | 'right';
//   };
//   style?: {
//     background?: string;
//     color?: string;
//     fontFamily?: string;
//   };
//   autoHideDuration?: 1000 | 2000 | 3000 | 4000 | 5000 | 6000;
// };

export const NotificationContextProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({
    msg: "",
  });

  const handleNotificationMsg = (payload) => {
    setNotification(payload);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      {notification?.action?.quote && (
        <Typography>{notification.action?.quote}</Typography>
      )}
      {notification?.action?.btnText && (
        <Button
          color="secondary"
          size="small"
          onClick={notification.action?.onClick}
        >
          {notification.action?.btnText}
        </Button>
      )}
      {notification.action?.closable && (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </React.Fragment>
  );

  return (
    <NotificationContext.Provider
      value={{
        handleNotificationMsg,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={notification?.autoHideDuration ?? 6000}
        onClose={handleClose}
        message={notification?.msg ?? ""}
        action={notification?.action ? action : null}
        anchorOrigin={
          notification?.anchorOrigin ?? {
            vertical: "bottom",
            horizontal: "left",
          }
        }
        sx={{
          "& .MuiPaper-root": {
            background: notification?.style?.background ?? "whitesmoke",
            color: notification?.style?.color ?? "#333",
            fontFamily: notification?.style?.fontFamily ?? "Poppins",
          },
        }}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => React.useContext(NotificationContext);
