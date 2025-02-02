import { Label } from "@/components/ui/label";
import { Eraser } from "lucide-react";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { ClearableInput } from "@/components/ui/clearable-input";
import TagInput from "@/components/ui/TagInput";
export interface SearchField {
  icon: React.ElementType;
  label: string;
  placeholder: string;
  termKey: string;
  isTag?: boolean;
}

export const SearchFields = ({
  updateQueryParams,
  searchFieldsData,
}: {
  updateQueryParams: (searchTerms: Record<string, string | string[]>) => void;
  searchFieldsData: SearchField[];
}) => {
  const [searchTerms, setSearchTerms] = useState<
    Record<string, string | string[]>
  >(() => {
    const initialSearchTerms: Record<string, string | string[]> = {};
    searchFieldsData.forEach((field) => {
      initialSearchTerms[field.termKey] = "";
    });
    return initialSearchTerms;
  });

  useDebounce(
    () => {
      const updatedSearchTerms: Record<string, string | string[]> = {};
      Object.entries(searchTerms).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          updatedSearchTerms[key] = value.join(",");
        } else {
          updatedSearchTerms[key] = value;
        }
      });
      updateQueryParams(updatedSearchTerms);
    },
    [searchTerms],
    1000,
  );

  function handleChange(key: string, value: string | string[]) {
    setSearchTerms((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }
  function clearFilters() {
    setSearchTerms((prevState) => {
      const clearedFilters: Record<string, string | string[]> = {};
      Object.keys(prevState).forEach((key) => {
        clearedFilters[key] = Array.isArray(prevState[key]) ? [] : "";
      });
      const tagsKeys = Object.keys(prevState).filter((key) =>
        Array.isArray(prevState[key]),
      );
      tagsKeys.forEach((key) => {
        clearedFilters[key] = "";
      });
      return clearedFilters;
    });
  }
  const isFilterApplied = Object.values(searchTerms).some(
    (value) => value !== "" || (Array.isArray(value) && value.length > 0),
  );

  return (
    <>
      <div className="hidden sm:flex h-5 items-center justify-end space-x-4 text-sm">
        {searchFieldsData.map((field, index) => (
          <div key={index} className="search">
            <Label
              className={"flex items-center text-sm"}
              htmlFor={field.label.toLowerCase()}
            >
              <field.icon className={"mx-1 w-4 h-4"} /> {field.label}
            </Label>
            {field.isTag ? (
              <TagInput
                placeholder={field.placeholder}
                className="h-8 w-[150px] lg:w-[250px]"
                tags={
                  Array.isArray(searchTerms[field.termKey])
                    ? (searchTerms[field.termKey] as string[])
                    : []
                }
                setTags={(tags: string[]) => handleChange(field.termKey, tags)}
              />
            ) : (
              <ClearableInput
                placeholder={field.placeholder}
                className="h-8 w-[150px] lg:w-[250px]"
                value={searchTerms[field.termKey]}
                onChange={(event) =>
                  handleChange(field.termKey, event.target.value)
                }
                onClear={() => handleChange(field.termKey, "")}
              />
            )}
          </div>
        ))}

        {isFilterApplied ? (
          <Button
            onClick={clearFilters}
            variant={"outline"}
            className={" mt-5 w-13 h-8"}
          >
            <Eraser className="mr-2 h-4 w-4" /> Clear
          </Button>
        ) : (
          <div className="w-[89px] h-8"></div>
        )}
      </div>
    </>
  );
};
