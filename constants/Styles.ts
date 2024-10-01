import { cn } from "~/lib/utils"
import { PARAGRAPH } from "./Typography"

export const CONTAINER = cn(PARAGRAPH, "px-2")
export const FORM = "flex flex-col gap-4"
export const ROW = "flex flex-row gap-2"
export const COL_SPAN = {
  "1": "flex-[1]",
  "2": "flex-[2]",
  "3": "flex-[3]",
  "4": "flex-[4]"
}