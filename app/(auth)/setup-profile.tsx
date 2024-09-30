import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/InputField'
import { icons } from '@/constants/icons'
import UniButton from '@/components/UniButton'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from '@apollo/client'
import * as SecureStore from 'expo-secure-store';
import ReactNativeModal from 'react-native-modal'
import { check } from '@/constants/images'
import { CREATE_USER } from '@/graphql/mutation/user'
// import { check } from '@/constants/image'

const ProfileSetup = () => {
  const { user } = useUser();
  const [formDetail, setFormDetail] = useState({
    name: '',
    department: '',
    level: '',
    phoneNo: '',
    universityId: 'cm1afjm0a0001u8tj6lwqq6k6'
  })
  const [setupModal, setSetupModal] = useState(false);
  const [createUser] = useMutation(CREATE_USER)

  console.log(formDetail)

  const [loading, setLoading] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress;

  console.log(email)

    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            backgroundColor: 'white',
            color: 'black',  // Text color
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
            paddingRight: 30,  // To ensure the text is not clipped by the arrow icon
        },
        inputAndroid: {
            backgroundColor: 'white',
            color: 'black',  // Text color
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
            paddingRight: 30,  // To ensure the text is not clipped by the arrow icon
        },
    });
    
    const [image, setImage] = useState<string>();

  const pickImage = async () => {
    // Request media library permissions
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allows cropping
      aspect: [4, 3], // Aspect ratio for the cropper
      quality: 1, // Image quality
      base64: true
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      // console.log(result)
      setImage(uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data: userDetail } = await createUser({
        variables: {
          name: formDetail?.name,
          email: 'henry@gmail.com',
          department: formDetail?.department,
          level: formDetail?.level,
          phoneNo: formDetail?.phoneNo,
          universityId: formDetail?.universityId
        }
      })
      
      await SecureStore.setItemAsync('userId', JSON.stringify(userDetail?.createUser?.id));
      setSetupModal(true)
    } catch (err: any) {
      Alert.alert(err);
      setSetupModal(false);
    }
    setLoading(false)
  }

  const completeSetup = () => {
    setSetupModal(false);
    router.push('/(root)/(tabs)/home')
  }


  return (
    <View className='h-screen justify-start flex flex-col gap-5 p-6'>
        <Text className='font-JakartaBold text-center text-lg mb-10'>Kindly setup your profile</Text>
      <View className=''>
       
        <InputField label='Name' placeholderText='Name' icon={icons.user} onChangeText={(value) => setFormDetail({...formDetail, name: value})}/>
        <InputField label='Department' placeholderText='Department' icon={icons.Account} onChangeText={(value) => setFormDetail({...formDetail, department: value})}/>
        <InputField label='Level' placeholderText='Level' icon={icons.level} onChangeText={(value) => setFormDetail({...formDetail, level: value})}/>
        <InputField label='Phone number' placeholderText='Phone number' icon={icons.contact} onChangeText={(value) => setFormDetail({...formDetail, phoneNo: value})}/>

        <View className='mt-10'>
          <UniButton title='Complete' onPress={handleSubmit} loading={loading} />
        </View>
      </View>
      <ReactNativeModal isVisible={setupModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={check} className="w-20 h-20 mx-auto mb-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium text-center mt-2">
              Account setup completed.
            </Text>
            <UniButton
              title="Browse Home"
              onPress={completeSetup}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
    </View>
  )
}

export default ProfileSetup