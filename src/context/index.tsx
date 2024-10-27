import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface DrawerParam {
  title: string;
  body: string;
}

const UserContext = React.createContext<{
  setDrawerTitle: any;
  drawerTitle: string;
  drawerBody: string;
  setDrawerBody: any;
  closeDrawer: any;
  drawerIsOpen: boolean;
  setDrawerIsOpen: any;
  passDrawerParams: (data: DrawerParam) => {} | any;
}>({
  setDrawerTitle: undefined,
  drawerTitle: "",
  drawerBody: "",
  setDrawerBody: undefined,
  closeDrawer: undefined,
  drawerIsOpen: false,
  setDrawerIsOpen: undefined,
  passDrawerParams: undefined,
});

export const useUserContext = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerBody, setDrawerBody] = useState("");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerTitle("");
    setDrawerBody("");
    setDrawerIsOpen(false);
  };

  const passDrawerParams = (data: DrawerParam) => {
    setDrawerTitle(data.title);
    setDrawerBody(data.body);
    setDrawerIsOpen(true);
  };

  return {
    drawerTitle,
    setDrawerTitle,
    drawerBody,
    setDrawerBody,
    closeDrawer,
    drawerIsOpen,
    setDrawerIsOpen,
    passDrawerParams,
  };
};

export const UserContextProvider = ({ children }) => {
  const auth = useUserContext();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useClient = () => useContext(UserContext);
