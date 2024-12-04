import usePrevious from "@/utils/useHooks/usePrevious";
import React, {
  memo,
  useRef,
  useLayoutEffect,
  InputHTMLAttributes,
} from "react";

interface SingleOTPInputProps extends InputHTMLAttributes<HTMLInputElement> {
  focus: boolean;
  autoFocus: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} required />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
