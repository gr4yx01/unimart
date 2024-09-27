import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Image, Platform, NativeSyntheticEvent, NativeTouchEvent, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface InputFieldProp {
  placeholderText: string,
  label: string,
  icon?: any,
  password?: boolean,
  secureTextEntry?: boolean
  togglePasswordVisibility?: () => void
  onChangeText: (value: string) => void
  value?: string
}

const InputField = ({ placeholderText, label, icon, togglePasswordVisibility, secureTextEntry, password,  onChangeText, value }: InputFieldProp ) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback>
            <View className='gap-2 mb-5'>
                {/* <Text className='font-JakartaSemiBold'>{label}</Text> */}
                <View className='bg-white p-3 rounded-xl flex-row items-center relative'>
                  { icon && <Image source={icon} className='w-6 h-6' resizeMode='contain'/> }
                    <TextInput secureTextEntry={secureTextEntry} placeholder={placeholderText} value={value} className={`font-JakartaBold text-md ml-2 w-full`} onChangeText={onChangeText}/>
                    {
                      password && (
                        <TouchableOpacity onPress={togglePasswordVisibility} className='absolute right-3'>
                          <Ionicons name={secureTextEntry ? 'eye-off-outline' : 'eye-outline' } size={20} color='black' />
                        </TouchableOpacity>
                      )
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField