import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Children, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { z } from "zod";
import {
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "~/components/form";
import { StepForm, StepFormScreen } from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { InfoForm } from "./(components)/info-form";
import { LoanDetailForm } from "./(components)/loan-detail-form";

export const defaultValues = [
  {
    loanId: "001",
    dueDate: new Date(),
    loanType: "fixed",
    paymentType: "monthly",
    firstPaymentDate: new Date(),
    loanTermType: undefined,
    loanCategory: "newLoan",
  },
];

export const formSchemas = [
  z
    .object({
      loanId: z
        .string()
        .min(1, { message: "ชื่อต้องมากกว่า 1 ตัวอักษร" })
        .max(10),
      dueDate: z.date().default(new Date()),
      loanType: z.enum(["fixed", "adjustable"]),
      paymentType: z.enum(["monthly", "daily", "custom"]),
      firstPaymentDate: z.date(),
      loanTermType: z.string().optional(),
      loanCategory: z.enum(["newLoan", "oldLoan"]),
    })
    .refine(
      // raise error when paymentType custom is selected
      (input) => {
        if (
          input.paymentType === "custom" &&
          (input.loanTermType === "" || input.loanTermType === undefined)
        ) {
          return false;
        }
        return true;
      },
      { message: "จำเป็นต้องใส่ข้อมูล", path: ["loanTermType"] }
    ),
  z.object({
    name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(30),
    lastname: z
      .string()
      .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
      .max(30),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format",
    }),
  }),
];

const create = () => {
  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);
  }

  const forms = [LoanDetailForm, InfoForm];

  return (
    <StepForm
      onSubmit={onSubmit}
      forms={forms}
      formSchemas={formSchemas}
      defaultValues={defaultValues}
    />
  );
};

export default create;
