export interface CheckboxProps {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  onChecked?: (value: boolean) => void;
}
