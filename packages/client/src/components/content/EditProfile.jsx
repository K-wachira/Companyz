import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  VStack,
  Select,
  Box,
} from "@chakra-ui/react";
import { formSchema } from "@companyz/common";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../AccountContext";
import TextField from "../shared/TextField";

const EditProfile = () => {
  const { user, setUser, profile, setProfile } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [marital_status, setMarital_status] = useState(profile.marital_status);
  return (
    <Formik
      initialValues={{
        id: profile.id,
        username: user.username,
        f_name: profile.first_name,
        l_name: profile.last_name,
        gender: profile.gender,
        age: profile.age,
        dob: profile.dob,
        marital_status: marital_status,
        nationality: profile.nationality,
      }}
      onSubmit={(values, actions) => {
        values.marital_status = marital_status;
        const vals = { ...values };
        console.log("values ******* ", vals);
        actions.resetForm();
        fetch("http://localhost:4000/profile/edit", {
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
            return res;
          })
          .then((data) => {
            navigate(0);
          });
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
        <Heading>Edit Profile</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>

        <TextField
          name="username"
          placeholder="Enter First Name"
          autoComplete="off"
          label="User Name"
        />

        <TextField
          name="f_name"
          placeholder="Enter First Name"
          autoComplete="off"
          label="First Name"
        />

        <TextField
          name="l_name"
          placeholder="Enter last Namr"
          autoComplete="off"
          label="Last Name"
        />

        <TextField
          name="gender"
          placeholder="Enter Gender"
          autoComplete="off"
          label="Gender"
        />

        <TextField
          name="age"
          placeholder="Enter Age"
          autoComplete="off"
          label="Age"
        />

        <TextField
          name="dob"
          placeholder="Enter DOB"
          autoComplete="off"
          label="Date Of Birth"
          type="date"
        />

        <TextField
          name="nationality"
          placeholder="Enter Nationality"
          autoComplete="off"
          label="Nationality"
        />

        <Text>
          Marital Status
          <Select
            placeholder={marital_status}
            onChange={(e) => setMarital_status(e.target.value)}
          >
            <option value="SINGLE">SINGLE</option>
            <option value="MARRIED,">MARRIED</option>
            <option value="DIVORCED">DIVORCED</option>
            <option value="WIDOWED">WIDOWED</option>
          </Select>
        </Text>

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

export default EditProfile;
