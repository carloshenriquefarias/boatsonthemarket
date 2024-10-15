// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
// import PropTypes from "prop-types";
// Custom components
import { NavLink } from "react-router-dom";
// Assets

export default function DefaultAuth(props: any) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Flex position='relative' h='max-content' bg='white'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w='100%'
        maxW={{ md: "50%", lg: "2000px" }}
        mx='auto'
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent='start'
        direction='column'
      >
        <NavLink
          to='/admin'
          style={() => ({
            width: "fit-content",
            marginTop: "40px",
          })}>
        </NavLink>

        {children}

        <Box
          display={{ base: "none", md: "block" }}
          h='100%'
          minH='100vh'
          w={{ lg: "50vw", "2xl": "65vw" }}
          position='absolute'
          right='0px'
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify='center'
            align='end'
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='100%'
            position='absolute'
            borderBottomLeftRadius={{ lg: "100px", xl: "200px" }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
// PROPS

// AuthIllustration.propTypes = {
//   illustrationBackground: PropTypes.string,
//   image: PropTypes.any,
// };

// export default AuthIllustration;
