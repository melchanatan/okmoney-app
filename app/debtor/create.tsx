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

const formSchemas = [
  z.object({
    email: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
  }),
];

const create = () => {
  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);
  }

  const forms = [InfoForm];

  return (
    <StepForm onSubmit={onSubmit} forms={forms} formSchemas={formSchemas} />
  );
};

export default create;

const InfoForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้</Text>
        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="email">ชื่อ</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>
                <FormMessage errorMessage={errors.email?.message}></FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="email">นามสกุล</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>
                <FormMessage errorMessage={errors.email?.message}></FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="phone">เบอร์โทร</FormLabel>
                <PhoneInput
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>
                <FormMessage errorMessage={errors.email?.message}></FormMessage>
              </FormItem>
            )}
          />
        </View>
      </View>
    </StepFormScreen>
  );
};

const styles = StyleSheet.create({});
