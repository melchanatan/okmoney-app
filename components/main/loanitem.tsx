import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, BUTTON, LABEL, TITLE } from "~/constants/Typography";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/button";
import { Loan } from "~/types/Loan";

const statusColorsbg: Record<string, string> = {
  ค้างชำระ: "bg-red-500", // Overdue
  ครบชำระ: "bg-gray-200", // Paid
  รอชำระ: "bg-blue-500", // Pending
  ใกล้กำหนด: "bg-yellow-500", // Canceled
};

const statusColorstxt: Record<string, string> = {
  ค้างชำระ: "text-destructive-foreground", // Overdue
  ครบชำระ: "text-gray-600", // Paid
  รอชำระ: "text-destructive-foreground", // Pending
  ใกล้กำหนด: "text-destructive-foreground", // Canceled
};

export const LoanItem = ({ loan }: { loan: Loan }) => {
  // Calculate the progress based on outstanding vs total
  const progress = loan.outstanding / loan.total;
  const statusColorbg = statusColorsbg[loan.status] || "bg-blue-500";
  const statusColortxt = statusColorstxt[loan.status] || "text-textb";

  return (
    // background deptor
    <View className="bg-card p-3 my-1 rounded-3xl border border-border space-y-3 ">
      {/* Profile Image and Loan Info */}
      <View className="flex flex-col gap-2">
        <View className="justify-between flex flex-row">
          <View className="flex-row items-center space-x-4">
            {/* Profile Image */}
            <Image
              source={{ uri: loan.profileImage }}
              className="w-12 h-12 rounded-full"
            />

            {/* Loan Info */}
            <View>
              <Text className={cn(LABEL, "text-muted-foreground pl-2")}>
                เลขสัญญา {loan.id}
              </Text>
              {/* Name: Bold nickname, gray full name */}
              <Text className={cn(PARAGRAPH, "pl-2 ")}>
                {loan.nickname + "  "}
                <Text className="text-muted-foreground font-ibm text-sm">
                  {loan.name}
                </Text>
              </Text>
            </View>
          </View>

          {/* Loan Status */}
          <View className="flex-row flex gap-2">
            <View
              className={`px-3 py-2 rounded-2xl self-start ${statusColorbg}`}
            >
              <Text
                className={cn(
                  LABEL,
                  `font-ibm-semibold text-destructive-foreground ${statusColortxt}`
                )}
              >
                {loan.status}
              </Text>
            </View>

            <Button variant="ghost" size={"icon"}>
              <Icon name="Ellipsis" size={24} color="#71717a" />
            </Button>
          </View>
        </View>

        {/* Outstanding Amount and Progress Bar with Total Amount on the Right */}
        <View className="flex-row items-center space-x-2">
          {/* Progress Bar */}
          <View className="flex-1 h-6 bg-background rounded-lg relative border border-border ">
            <View
              className="absolute h-full bg-orange-500 rounded-md"
              style={{ width: `${progress * 100}%` }}
            />
            <View className="absolute inset-0 flex-row justify-between items-center px-2">
              {/* Outstanding Amount (left side inside the bar) */}
              <Text className="text-orange-600 font-bold">
                {loan.outstanding} บาท
              </Text>
              {/* Total Amount (right side inside the bar) */}
              <Text className="text-gray-400 absolute right-2">
                {loan.total} บาท
              </Text>
            </View>
          </View>

          <View className="px-2"></View>

          {/* Due Date */}
          <Text className={cn(TITLE, "text-muted-foreground text-sm mt-1")}>
            ชำระทุก {loan.dueDate}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center mt-3 space-x-2 mb- gap-1">
        {/* Remind Button with Icon */}
        <Button className="bg-destructive-foreground flex-1 flex-row justify-center items-center border border-muted-foreground rounded-2xl py-2">
          <Icon name="Send" color="#71717a" size={22} />
          <Text className={cn(BUTTON, "text-textb ml-2 font-ibm-semibold")}>
            ทวงหนี้
          </Text>
        </Button>

        {/* Save Button */}
        <Button className="flex-1 bg-destructive py-2 flex-row justify-center items-center rounded-2xl">
          <Icon name="NotebookPen" color="white" size={22} />
          <Text
            className={cn(
              BUTTON,
              "text-destructive-foreground font-ibm-semibold ml-2"
            )}
          >
            บันทึกรายการ
          </Text>
        </Button>
      </View>
    </View>
  );
};
