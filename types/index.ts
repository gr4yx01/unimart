import React from "react";
import { TouchableOpacityProps } from "react-native";

declare interface UniButtonProp extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
  }

interface BookCardProp {
  book: {
    title: string;
    imgUrl: string;
    price: number;
    order_mode: string;
    course_code: string;
    has_ca: {
      ca_price: number;
      filling_price: number;
    }
    vendor: {
      name: string;
    }
  }
}


  export {
    UniButtonProp,
    BookCardProp
  }
