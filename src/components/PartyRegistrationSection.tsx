import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const DESIGNATIONS = [
  "தலைமை நிலைய செயலாளர்",
  "முன்னமைச் செயலாளர்",
  "கொள்கை பரப்புச் செயலாளர்",
  "ஒருங்கிணைப்பாளர்",
  "அமைப்புச் செயலாளர்",
  "அமைப்பாளர்",
  "துணை ஒருங்கிணைப்பாளர்",
  "துணை அமைப்பாளர்",
  "மாவட்ட இளைஞரணி தலைவர்",
  "மேற்கு மண்டல செயலாளர்",
  "மத்திய மண்டல தலைவர்",
  "தகவல் தொழில்நுட்ப பிரிவு மாநில செயலாளர்",
  "செய்தி தொடர்பாளர்",
];


const schema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(255),
  date_of_birth: z.date({ required_error: "Date of birth is required" }),
  mobile_number: z
    .string()
    .trim()
    .regex(/^\d+$/, "Numbers only")
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits"),
  designation: z.string().min(1, "Designation is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().trim().min(1, "Address is required").max(500, "Maximum 500 characters"),
});

type FormState = {
  full_name: string;
  date_of_birth: Date | undefined;
  mobile_number: string;
  designation: string;
  location: string;
  address: string;
};

const initialState: FormState = {
  full_name: "",
  date_of_birth: undefined,
  mobile_number: "",
  designation: "",
  location: "",
  address: "",
};

const PartyRegistrationSection = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [designationOpen, setDesignationOpen] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      const { [key]: _, ...rest } = p;
      return rest;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("party_registrations").insert({
      full_name: parsed.data.full_name,
      date_of_birth: format(parsed.data.date_of_birth, "yyyy-MM-dd"),
      mobile_number: parsed.data.mobile_number,
      designation: parsed.data.designation,
      location: parsed.data.location,
      address: parsed.data.address || null,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Submission failed. Please try again.");
      return;
    }
    toast.success("Registration submitted successfully!");
    setForm(initialState);
    setErrors({});
  };

  return (
    <section id="party-registration" className="py-20 bg-background px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-accent/20 shadow-lg">
          <CardHeader className="text-center border-b border-border/40">
            <CardTitle className="text-3xl font-black text-accent">
              Party Registration Form
            </CardTitle>
            <CardDescription>
              Fill in your details to register with MJMK.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="full_name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                  maxLength={255}
                  className={cn(errors.full_name && "border-destructive")}
                />
                {errors.full_name && (
                  <p className="text-sm text-destructive">{errors.full_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Date of Birth <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.date_of_birth && "text-muted-foreground",
                        errors.date_of_birth && "border-destructive",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date_of_birth
                        ? format(form.date_of_birth, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.date_of_birth}
                      onSelect={(d) => set("date_of_birth", d)}
                      disabled={(date) => date > new Date()}
                      captionLayout="dropdown-buttons"
                      fromYear={1930}
                      toYear={new Date().getFullYear()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date_of_birth && (
                  <p className="text-sm text-destructive">{errors.date_of_birth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile_number">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobile_number"
                  type="tel"
                  inputMode="numeric"
                  value={form.mobile_number}
                  onChange={(e) =>
                    set("mobile_number", e.target.value.replace(/\D/g, "").slice(0, 15))
                  }
                  placeholder="Numbers only"
                  className={cn(errors.mobile_number && "border-destructive")}
                />
                {errors.mobile_number && (
                  <p className="text-sm text-destructive">{errors.mobile_number}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Posting / Designation <span className="text-destructive">*</span>
                </Label>
                <Popover open={designationOpen} onOpenChange={setDesignationOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between font-normal",
                        !form.designation && "text-muted-foreground",
                        errors.designation && "border-destructive",
                      )}
                    >
                      <span className="truncate">
                        {form.designation || "Select designation"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search designation..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {DESIGNATIONS.map((d) => (
                            <CommandItem
                              key={d}
                              value={d}
                              onSelect={() => {
                                set("designation", d);
                                setDesignationOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  form.designation === d ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {d}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.designation && (
                  <p className="text-sm text-destructive">{errors.designation}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  maxLength={255}
                  placeholder="Enter your location"
                  className={cn(errors.location && "border-destructive")}
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  rows={3}
                  maxLength={500}
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  className={cn(errors.address && "border-destructive")}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {form.address.length}/500
                </p>
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>


              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-11"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PartyRegistrationSection;
