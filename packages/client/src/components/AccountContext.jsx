import { useNavigate } from "react-router";
import { Text } from "@chakra-ui/layout";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        getAllNodes({ username: data.username });

        navigate("/home");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllNodes = (vals) => {
    fetch("http://localhost:4000/profile/view", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vals),
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        setProfile({ ...data });
      });
  };

  return (
    <AccountContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
