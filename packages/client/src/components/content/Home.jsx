//  chakra template gotten from https://chakra-templates.dev/templates/navigation/navbar/withDarkModeSwitcher
import { React, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, InfoIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { AccountContext } from "../AccountContext";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { user, setUser, profile, setProfile } = useContext(AccountContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const a_url =
    profile.avatar_url === null
      ? "db1cebddeddd292fd46fcdbcc37033fc"
      : profile.avatar_url;
  function out() {
    fetch("http://localhost:4000/auth/logout", {
      body: JSON.stringify({}),
    })
      .catch((err) => {
        return;
      })
      .then((data) => {
        console.log("Loggged out");
        navigate("/login");
      });
  }
  return profile.id === undefined ? (
    <Center>
      <img alt="Loading" src="/assets/Gifs/loadingdark.gif" />
    </Center>
  ) : (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>CompanyZ</Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"http://localhost:4000/assets/image/" + a_url}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"http://localhost:4000/assets/image/" + a_url}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p> {user.username} </p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/profile")}>
                    Account Settings
                  </MenuItem>
                  <MenuItem onClick={() => out()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Center>
        <Box p={4}>Main Content Goes Here</Box>
      </Center>
    </>
  );
}
