import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from '@chakra-ui/react';
interface Props {
  value: number;
  onChange: (value: number) => void;
}
const MIN_QTY = 1;
export default function QuantityField(props: Props) {
  const handleMinusClick = () => {
    if (props.value <= MIN_QTY) {
      return;
    }
    props.onChange(props.value - 1);
  };
  return (
    <InputGroup>
      <InputLeftAddon onClick={() => handleMinusClick()} userSelect="none">
        -
      </InputLeftAddon>
      <Input
        type="text"
        width="50px"
        textAlign="center"
        padding="0px"
        readOnly
        value={props.value}
      />
      <InputRightAddon
        onClick={() => props.onChange(props.value + 1)}
        userSelect="none"
      >
        +
      </InputRightAddon>
    </InputGroup>
  );
}
