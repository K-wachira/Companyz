//  chakra template gotten from https://chakra-templates.dev/templates/navigation/navbar/withDarkModeSwitcher

import { useNavigate } from "react-router";
import { useContext, useState, useEffect, createContext } from "react";
import { AccountContext } from "../AccountContext";
import axios from "axios";
import {
  Box,
  Flex,
  Avatar,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Input,
  ListItem,
  List,
  Container,
  Divider,
  Icon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";

async function postImage({ image, profile }) {
  const formData = { image: image, id: profile.id };
  const result = await axios.post(
    "http://localhost:4000/assets/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return result.data;
}

export default function Nav() {
  const { user, setUser, profile, setProfile } = useContext(AccountContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, profile });
    navigate(0);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  console.log("Profile", profile);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button onClick={() => navigate(0)} leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}></Stack>
          </Flex>
        </Flex>
      </Box>

      {profile.is_verified ? (
        <Text></Text>
      ) : (
        <Center>
          <Alert status="warning" onClick={() => navigate("/verify")}>
            <AlertIcon />
            Seems your account is not verified, click here to verify
          </Alert>
        </Center>
      )}
      <Box textAlign="center" py={10} px={6}>
        <Center>
          <Avatar
            size={"2xl"}
            src={"http://localhost:4000/assets/image/" + profile.avatar_url}
          />
          {profile.is_verified ? (
            <Center>
              <Icon m={3} as={CheckIcon} w={9} h={12} color="blue.5=400" />
            </Center>
          ) : (
            <Text></Text>
          )}
        </Center>

        <Container maxW="md" bg="gray.800" color="gray.800">
          ||||||||||
        </Container>
        <Container maxW="md" bg="gray.800" color="gray.800">
          ||||||||||
        </Container>
        <Center>
          <form onSubmit={submit} encType="multipart/form-data" method="post">
            <Input
              onChange={fileSelected}
              name="image"
              type="file"
              accept="image/*"
              placeholder="Basic usage"
            ></Input>

            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
          </form>
          {images.map((image) => (
            <div key={image}>
              <img src={image}></img>
            </div>
          ))}
        </Center>

        <Divider />
        <Container maxW={"7xl"}>
          <Box m={5} p={5} alignItems={"center"}>
            <List spacing={8}>
              <ListItem justifyContent={"space-between"}>
                <Text
                  as={"span"}
                  fontWeight={"bold"}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                >
                  PROFILE DETAILS:
                </Text>{" "}
                <Button
                  onClick={() => navigate("/editprofile")}
                  leftIcon={<EditIcon />}
                >
                  {/* Edit Profile */}
                </Button>
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  First Name:
                </Text>{" "}
                {profile.first_name}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Last Name:
                </Text>{" "}
                {profile.last_name}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Gender:
                </Text>{" "}
                {profile.gender}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Age:
                </Text>{" "}
                {profile.age}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Date of Birth:
                </Text>{" "}
                {profile.dob}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Marital Status:
                </Text>{" "}
                {profile.marital_status}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Nationality:
                </Text>{" "}
                {profile.nationality}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Identification Document:
                </Text>{" "}
                PassPort
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Identification Number:
                </Text>{" "}
                12345678910
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
    </>
  );
}
