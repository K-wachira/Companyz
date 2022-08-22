import {  CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  VStack,
  Select,
  Center,
  Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { useContext, useState} from "react";
import { AccountContext } from "../AccountContext";
import axios from "axios";

async function postNid({ image, profile, id_type, id_number }) {
  const formData = {
    image: image,
    id: profile.id,
    id_type: id_type,
    id_number: id_number,
    type: "verification",
  };
  const result = await axios.post(
    "http://localhost:4000/assets/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return result.data;
}

const VerifyAccount = () => {
  const { profile } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [id_type, setId_type] = useState("NID");
  const [id_number, setId_number] = useState();

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    const result = await postNid({ image: file, profile, id_type, id_number });
    navigate(0);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleChange = (event) => {
    setId_number(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Formik
      initialValues={{
        id: profile.id,
        id_number: profile.id_number,
        id_type: profile.id_type,
      }}
      onSubmit={(values, actions) => {
        values.id_type = id_type;

        const vals = { ...values };
        console.log("xx", id_type, id_number, vals);
        actions.resetForm();
        submit();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="left"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Account Verification</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>

        <Text mb="8px">
          Enter your Identification Number as it appears on the Document
          <Input
            value={id_number}
            onChange={handleChange}
            placeholder="Enter Your ID number here"
            size="sm"
          />
        </Text>

        <Text>
          Select Your Document Type
          <Select
            placeholder={id_type}
            onChange={(e) => setId_type(e.target.value)}
          >
            <option value="NID">NID</option>
            <option value="PassPort">PassPort</option>
            <option value="Other">Other</option>
          </Select>
        </Text>

        <Center>
          <form encType="multipart/form-data" method="post">
            <Input
              onChange={fileSelected}
              name="image"
              type="file"
              accept="image/*"
              placeholder="Basic usage"
            ></Input>
          </form>
          {images.map((image) => (
            <span key={image}>
              <img src={image}></img>
            </span>
          ))}
        </Center>

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
          <Button onClick={() => navigate("/profile")} leftIcon={<CloseIcon />}>
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default VerifyAccount;
