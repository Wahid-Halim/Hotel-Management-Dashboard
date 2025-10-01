import styled from "styled-components";
import Button from "./Button";
import Heading from "../ui/Heading";
import { GlobalStyles } from "../styles/GlobalStyles";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

const ButtonBox = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding:1rem  4.3rem 0 4.3rem;
  flex-direction: column;
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 😕</Heading>
        </Box>
      </StyledErrorFallback>
      <ButtonBox>
        <p>{error.message}</p>
        <Button
          variation="primary"
          size="large"
          onClickCapture={resetErrorBoundary}
        >
          Try again
        </Button>
      </ButtonBox>
    </>
  );
}

export default ErrorFallback;
