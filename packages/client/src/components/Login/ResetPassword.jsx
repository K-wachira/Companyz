import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { signupFormSchema } from "@companyz/common";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../AccountContext";
import TextField from "../shared/TextField";

const ResetPassword = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ password: "", confirmPassword:"" }}
    //   validationSchema={signupFormSchema}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Reset Password</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="New Password"
          type="password"
        />

        <TextField
          name="confirmPassword"
          placeholder="Enter password"
          autoComplete="off"
          label="Confirm Password"
          type="password"
        />
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            leftIcon={<ArrowBackIcon />}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default ResetPassword;
