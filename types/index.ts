import React from "react";
import { TouchableOpacityProps } from "react-native/types";


declare interface UniButtonProp extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  loading?: Boolean
  onPress: () => void
}



interface ProductCardProp {
  product: {
    id: string
    name: string
    price: number
    thumbnail: string
    category: string
    description: string
    stock: number
    rating: number
    vendor:  {
      name : string
      image : string
      rating : number
    }
  }
}


  export {
    UniButtonProp,
    ProductCardProp
  }
