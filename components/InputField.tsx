import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const InputField = ({ placeholderText, label, icon, secureTextEntry }: { placeholderText: string, label: string, icon: any, secureTextEntry?: boolean}) => {
  return (
    <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
            <View className='gap-2 mb-5'>
                {/* <Text className='font-JakartaSemiBold'>{label}</Text> */}
                <View className='bg-white p-3 rounded-xl flex-row items-center'>
                    <Image source={icon} className='w-8 h-8'/>
                    <TextInput secureTextEntry={secureTextEntry} placeholder={placeholderText} className='font-JakartaBold text-md ml-2 w-full'/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField