import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customerApi } from "../../apis";
import { beneficiaryQueryKeys } from "@/lib/resourceEvents";

interface Props {
  id?: string;
  customerId: string;
  value: string;
  onChange: (iban: string) => void;
  enabled?: boolean;
  label?: string;
}

export function BeneficiarySelect({
  id = "beneficiary",
  customerId,
  value,
  onChange,
  enabled = true,
  label,
}: Props) {
  const { t } = useTranslation();
  const { data: beneficiaries } = useQuery({
    queryKey: beneficiaryQueryKeys.beneficiaries(customerId),
    queryFn: () => customerApi.listBeneficiaries({ customerId }),
    enabled,
  });

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label ?? t("payment.destination")}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={t("payment.selectBeneficiary")} />
        </SelectTrigger>
        <SelectContent>
          {beneficiaries?.map((b) => (
            <SelectItem key={b.id} value={b.iban}>
              {b.label} — {b.iban}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
