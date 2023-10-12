import { Input } from './styles';

interface SelectInputPros {
  value?: string;
  onChange: (change: any) => void;
  defaultText?: string;
  options: {
    value: string;
    text: string;
  }[];
}

export default function SelectInput({ value, defaultText, onChange, options }: SelectInputPros) {

  return (
    <>
      <Input value={value} onChange={e => onChange(e.target.value)}>
        <option value='' disabled hidden > {defaultText ? defaultText : '-- Ordenação -- '}</option>
        {options.map((option: any, index: number) =>
          <option
            key={index}
            value={option.value}>
            {option.text}
          </option>
        )}
      </Input>
    </>
  );
}
