import { useSearchParams } from "react-router-dom";
import { FC, useState, useMemo, useCallback, useRef, memo } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/lib/components/ui/inputs/input-group";
import { Search, Trash2 } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { appConfig } from "@/config/app";

interface SearchConfig {
  key: string;
  placeholder: string;
}

interface SearchInputProps {
  searchConfig: SearchConfig[];
  onSearch?: (key: string, value: string) => void;
}

export const SearchQueryParamInput: FC<SearchInputProps> = memo(
  ({ searchConfig, onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Memoize initial values to avoid recalculating on every render
    const initialValues = useMemo(
      () =>
        searchConfig.reduce(
          (acc, { key }) => {
            acc[key] = searchParams.get(key) || "";
            return acc;
          },
          {} as Record<string, string>,
        ),
      [searchConfig, searchParams],
    );

    const [values, setValues] = useState<Record<string, string>>(initialValues);
    const prevValuesRef = useRef(values);

    // Debounce the effect to update search params
    useDebounce(
      () => {
        if (JSON.stringify(prevValuesRef.current) === JSON.stringify(values)) {
          return;
        }

        const updatedSearchParams = new URLSearchParams(searchParams);

        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            updatedSearchParams.set(key, value);
          } else {
            updatedSearchParams.delete(key);
          }
        });

        setSearchParams(updatedSearchParams);
        prevValuesRef.current = values; // Update the ref

        if (onSearch) {
          Object.entries(values).forEach(([key, value]) => {
            onSearch(key, value);
          });
        }
      },
      [values],
      appConfig.debounceDelay,
    );

    const handleClear = useCallback((key: string) => {
      setValues((prev) => {
        if (prev[key] === "") return prev;
        return { ...prev, [key]: "" };
      });
    }, []);

    const handleChange = useCallback((key: string, value: string) => {
      setValues((prev) => {
        if (prev[key] === value) return prev;
        return { ...prev, [key]: value };
      });
    }, []);

    return (
      <div className="flex flex-wrap gap-4">
        {searchConfig.map(({ key, placeholder }) => (
          <InputGroup key={key} className="max-w-sm my-2">
            <InputGroupInput
              placeholder={placeholder}
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            <InputGroupAddon>
              <Search className="cursor-pointer" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="capitalize">
              {key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </InputGroupAddon>
            {values[key] && (
              <InputGroupAddon
                align="inline-end"
                onClick={() => handleClear(key)}
                className={
                  "cursor-pointer bg-slate-300 rounded text-xs mx-1 px-1"
                }
              >
                <Trash2 className={"h-4 w-4"} />
              </InputGroupAddon>
            )}
          </InputGroup>
        ))}
      </div>
    );
  },
);

SearchQueryParamInput.displayName = "SearchQueryParamInput";
