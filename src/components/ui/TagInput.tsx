import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder: string;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  className,
  placeholder,
  setTags,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: KeyboardEvent) => {
    if (
      (e.key === "Enter" ||
        e.key === "," ||
        e.key === " " ||
        e.key === "Spacebar") &&
      inputValue.trim() !== ""
    ) {
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tag.includes(" ")) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      setInputValue("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== "") {
      addTag(inputValue.trim());
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          ref={inputRef}
          value={tags.length >= 0 || inputValue != "" ? inputValue : ""}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        />

        <span className={"mt-2 flex items-center mx-1"}>
          {tags.slice(0, 3).map((tag, index) => (
            <div
              key={index}
              className="flex items-center  bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md px-2 py-1 mr-2 mb-2"
            >
              <span className="mr-1">{tag}</span>
              <button
                className="focus:outline-none"
                onClick={() => removeTag(tag)}
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {tags.length > 3 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md px-2 py-1 mr-2 mb-2 cursor-pointer">
                  <span>+{tags.length - 3} label(s)</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {tags.slice(3).map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-md px-2 py-1 mr-2 mb-2"
                  >
                    <span className="mr-1">{tag}</span>
                    <button
                      className="focus:outline-none"
                      onClick={() => removeTag(tag)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
};

export default TagInput;
