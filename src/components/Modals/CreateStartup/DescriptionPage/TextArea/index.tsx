import { forwardRef } from "react";
import { ErrorText, Label } from "@components/InputText/styles";
import { BiErrorCircle } from "react-icons/bi";
import { useTheme } from "styled-components";
import { TextAreaContainer, TextAreaContent } from "../styles";


interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    const { colors } = useTheme();

    return (
      <TextAreaContainer>
        <Label>{label}</Label>
        <TextAreaContent
          ref={ref}
          error={!!error}
          {...props}
        />
          {error && (
          <ErrorText >
            <BiErrorCircle color={colors.notification.error} size={22} />
            {error}
          </ErrorText>
        )}

      </TextAreaContainer>
    );
  }
);
