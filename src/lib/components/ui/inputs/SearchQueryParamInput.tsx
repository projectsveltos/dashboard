import { useSearchParams } from "react-router-dom";
import { FC, useState, useMemo, useCallback, useRef, memo } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/lib/components/ui/inputs/input-group";
import { Label } from "@/lib/components/ui/inputs/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/data-display/tooltip";
import { Search, Trash2 } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { appConfig } from "@/config/app";

export interface SearchConfig {
  key: string;
  label?: string;
  placeholder: string;
  tooltip?: string;
  icon?: React.ElementType;
}

interface SearchInputProps {
  searchConfig: SearchConfig[];
  onSearch?: (values: Record<string, string>) => void;
}

import { useTranslation } from "react-i18next";

export const SearchQueryParamInput: FC<SearchInputProps> = memo(
  ({ searchConfig, onSearch }) => {
    const { t } = useTranslation();
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
          onSearch(values);
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
        {searchConfig.map(({ key, label, placeholder, tooltip, icon: Icon }) => {
          const field = (
            <div key={key}>
              {label && (
                <Label className="flex items-center text-sm" htmlFor={key}>
                  {Icon && <Icon className="w-4 h-4" />} {t(label)}
                </Label>
              )}
              <InputGroup className="max-w-sm my-2">
                <InputGroupInput
                  id={key}
                  placeholder={t(placeholder)}
                  value={values[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
                <InputGroupAddon>
                  <Search className="cursor-pointer" />
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
            </div>
          );

          if (!tooltip) {
            return field;
          }

          return (
            <Tooltip key={key}>
              <TooltipTrigger>{field}</TooltipTrigger>
              <TooltipContent>{t(tooltip)}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    );
  },
);

SearchQueryParamInput.displayName = "SearchQueryParamInput";
