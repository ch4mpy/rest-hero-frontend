import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { customerService } from "@/rest/services";
import type { CustomerResponse } from "@/rest/types";
import { cn } from "@/lib/utils";

interface Props {
  value: CustomerResponse | null;
  onChange: (c: CustomerResponse | null) => void;
}
export function CustomerSelector({ value, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["customers", "search", search],
    queryFn: () => customerService.listCustomers({ search: search || undefined, size: 20 }),
    staleTime: 30_000,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 justify-between"
        >
          <span className="truncate">
            {value ? `${value.firstName} ${value.lastName}` : t("home.selectCustomer")}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t("home.searchCustomer")}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>{t("home.noAccounts")}</CommandEmpty>
            <CommandGroup>
              {data?.content.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.id}
                  onSelect={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === c.id ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                  <div className="flex flex-col">
                    <span>
                      {c.firstName} {c.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{c.email}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
