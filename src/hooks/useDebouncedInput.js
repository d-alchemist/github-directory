import { useState } from "react";
import { debounce } from "../utils/debounce";

export default function useDebouncedInput() {
  const [searchInput, setSearchInput] = useState("");

  const handleTextInput = (e) => {
    setSearchInput(e.target.value);
  }

  const debouncedOnChange = debounce(handleTextInput, 1000);

  return [searchInput, debouncedOnChange];
}
