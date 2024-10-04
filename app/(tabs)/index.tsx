import { Link } from "expo-router";
import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { LoanCard } from "~/components/main/loan-card";
import { Loan } from "~/types/Loan";
import { Searchbar } from "~/components/main/search_bar";
import { AvatarText } from "~/components/avatar-text";
import { IconButton } from "~/components/icon-button";
import { Plus } from "lucide-react-native";
import { GridComponent } from "~/components/main/grid-card";
import { Icon } from "~/components/icon";

const screenWidth = Dimensions.get("window").width;

const Index = () => {
  const [isGridView, setIsGridView] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // For sliding effect

  const toggleView = () => {
    Animated.timing(slideAnim, {
      toValue: isGridView ? 0 : -screenWidth, // Slide between 0 and screen width
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsGridView(!isGridView);
  };

  const loandata = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 4,
  };

  const demodata: Loan[] = [
    {
      id: "01",
      nickname: "บิบิ",
      name: "ธน สมพง",
      status: "รอชำระ",
      outstanding: 0,
      total: 500,
      dueDate: "30/5",
      profileImage:
        "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    },
    {
      id: "02",
      nickname: "แบงค์",
      name: "ธนาการ",
      status: "ใกล้กำหนด",
      outstanding: 100,
      total: 500,
      dueDate: "30/5",
      profileImage:
        "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    },
    {
      id: "03",
      nickname: "บิน",
      name: "ธุดง",
      status: "ครบชำระ",
      outstanding: 200,
      total: 500,
      dueDate: "30/5",
      profileImage:
        "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    },
    {
      id: "04",
      nickname: "โบ๊ท",
      name: "ทองสิระ",
      status: "ค้างชำระ",
      outstanding: 300,
      total: 500,
      dueDate: "30/5",
      profileImage:
        "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    },
  ];

  const visibleData =
    demodata.length > loandata.limit
      ? demodata.slice(0, loandata.limit)
      : demodata;

  return (
    <View className="">
      <LinearGradient
        colors={["#F3D791", "#DF9C59", "#FD954B"]}
        start={{ x: 1, y: -0.4 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradientBackground}
      />

      <SafeAreaView>
        <View className={cn(CONTAINER, "justify-between flex flex-row")}>
          <AvatarText url={loandata.profileImage} title="test">
            <Text className={cn(PARAGRAPH, "text-primary")}>
              {loandata.nickname}
            </Text>
          </AvatarText>
          <View className="flex flex-row gap-2">
            {loandata.status !== 0 && (
              <Button variant={"outline_white"} size={"premium"}>
                <View className="flex flex-row gap-2">
                  <Icon name="Users" color="white" size={24} />
                  <Icon name="Plus" color="white" size={24} />
                </View>
              </Button>
            )}
            <IconButton
              className="bg-white"
              textColor="#E59551"
              icon={<Plus />}
              text="เพิ่มลูกหนี้"
            />
          </View>
        </View>

        <View
          className={cn(
            CONTAINER,
            "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-2"
          )}
        >
          <View className="flex flex-col gap-5">
            <View>
              <ThemeToggle />
            </View>
            <View>
              <Searchbar toggleView={toggleView} isGridView={isGridView} />
            </View>
          </View>

          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: screenWidth * 2, // Total width (both views side by side)
              },
              { transform: [{ translateX: slideAnim }] }, // Slide effect
            ]}
          >
            <View style={{ width: screenWidth }}>
              <FlatList
                data={visibleData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LoanCard loan={item} />}
                contentContainerStyle={{ marginTop: 20, paddingBottom: 100 }} // Ensure padding for the footer
                ListFooterComponent={() => (
                  <View className="items-center justify-center rounded-3xl bg-green-100 py-4 mx-40 mt-3">
                    <Text className={cn(PARAGRAPH, "text-green-800")}>
                      จำนวนลูกหนี้ {demodata.length} / {loandata.limit}
                    </Text>
                  </View>
                )}
              />
            </View>

            <View style={{ width: screenWidth }}>
              {/* Wrap GridComponent in ScrollView */}
              <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }} // Padding for footer
              >
                <GridComponent data={visibleData} />
                {/* Footer for grid view */}
                <View className="items-center justify-center rounded-3xl bg-green-100 py-4 mx-40">
                  <Text className={cn(PARAGRAPH, "text-green-800")}>
                    จำนวนลูกหนี้ {demodata.length} / {loandata.limit}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 200,
  },
});
