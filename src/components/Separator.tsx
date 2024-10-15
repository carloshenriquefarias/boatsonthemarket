import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

interface SeparatorProps extends FlexProps {
  variant?: string;
}

const HSeparator: FC<SeparatorProps> = (props) => {
  const { variant, children, ...rest } = props;
  return <Flex h='1px' w='100%' bg='rgba(38, 56, 220, 0.3)' {...rest}></Flex>;
};

const VSeparator: FC<SeparatorProps> = (props) => {
  const { variant, children, ...rest } = props;
  return <Flex w='1px' bg='rgba(135, 140, 189, 0.3)' {...rest}></Flex>;
};

export { HSeparator, VSeparator };
