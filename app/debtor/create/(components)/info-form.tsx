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
import {
  NavigationProps,
  StepForm,
  StepFormScreen,
  StepFormScreenProps,
} from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";

export const InfoForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>
        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="name">ชื่อ</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormMessage errorMessage={errors.name?.message}></FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="lastname">นามสกุล</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormMessage
                  errorMessage={errors.lastname?.message}
                ></FormMessage>
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
                <FormMessage errorMessage={errors.phone?.message}></FormMessage>
              </FormItem>
            )}
          />
        </View>
      </View>
    </StepFormScreen>
  );
};
