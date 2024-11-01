import { View, Text, TouchableOpacity, Image, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '@/store/cart'
import UniButton from '@/components/UniButton'
import { useUser } from '@clerk/clerk-expo'
import { usePaymentStore } from '@/store/payment'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ethers } from 'ethers'

const Cart = () => {
    const cart = useCartStore((state) => state.products)
    const setIsPolling = usePaymentStore((state) => state.setIsPolling)
    const url = 'https://rpc.sepolia-api.lisk.com';
    const provider = new ethers.providers.JsonRpcProvider(url);
    const contractAddress = "0x43ca3D2C94be00692D207C6A1e60D8B325c6f12f"
    const CURRENT_ETH_PRICE_IN_NGN = 20000
    const vendors = cart?.map((vendor) => {
        console.log(vendor?.price)
        console.log(vendor?.quantity)

        const ethAmount = (Number(vendor?.price) * Number(vendor?.quantity)) / CURRENT_ETH_PRICE_IN_NGN;
        return {
            wallet_address: vendor?.vendor?.wallet_address,
            amount: ethers.utils.parseEther(ethAmount.toString())
        }
    })

    console.log(JSON.stringify(vendors))

    const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address[]",
              "name": "vendors",
              "type": "address[]"
            }
          ],
          "name": "PaymentInitialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "vendor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentProcessed",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_address",
              "type": "address"
            }
          ],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address payable",
                  "name": "wallet",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct UnimartPayment.Vendor[]",
              "name": "vendors",
              "type": "tuple[]"
            }
          ],
          "name": "initializePayment",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "platformFee",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

    const contract = new ethers.Contract(contractAddress, abi, provider);

      const [loading, setLoading] = useState(false)


    const computeTotalAmount = () => {
        const amount = cart?.reduce((acc, product) => acc + (product?.quantity * product?.price),0)
        return amount;
    }

    async function getLatestBlock() {
        const latestBlock = await provider.getBlockNumber();
        console.log("The latest block's number is:", latestBlock);
    }

    async function getBalance(address: string) {
        const value = await contract.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(value.toString());

        console.log(balanceInEth);
    }

    const privateKey = 'df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
    const signer = new ethers.Wallet(privateKey, provider);

    // Send 0.01 ether to a given address.
    async function sendTx(to: any) {
        const tx =  await signer.sendTransaction({
            to: to,
            value: ethers.utils.parseEther("0.001")
        });

        console.log(tx);
    }

    // async function makePayment(vendors: any) {
    //     const totalAmount = await vendors.reduce((acc, vendor: any) => acc.add(vendor.amount), ethers.BigNumber.from(0))

    //     console.log(totalAmount)
    //     // const tx = await contract.
    // }

    
    const proceedToConfirmPayment = async () => {
        setIsPolling(true)
        console.log('working')
        router.push('/(root)/payment')
    }

    
  return (
    <GestureHandlerRootView>
    <SafeAreaView className='relative h-screen p-3 space-y-4'>
        <View className='p-2 flex flex-row space-x-4 items-center'>
            <TouchableOpacity className=' bg-gray-400 p-2 rounded-full' onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className='font-JakartaBold text-lg'>Cart</Text>
        </View>
        <FlatList 
            data={cart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            ListFooterComponent={() => (
                <View className='flex flex-row items-center'>
                    <Text className='font-JakartaSemiBold'>Total amount: </Text>
                    <Text className='font-JakartaMedium'>N {computeTotalAmount()}</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <View key={item?.id} className='flex flex-row justify-between p-3 bg-gray-200 rounded-lg'>
                    <View className='flex flex-row space-x-2 items-center'>
                        <Image source={{ uri: item.thumbnail }} resizeMode='cover' className='w-14 h-14 rounded-full'/>
                        <View>
                            <Text className='font-JakartaSemiBold text-sm'>{item.name}</Text>
                            <Text className='font-JakartaMedium'>N {item.price}</Text>
                        </View>
                    </View>
                    <View className='flex flex-row items-center bg-white rounded-full w-24 justify-between p-2'>
                        <TouchableOpacity>
                            <Entypo name="plus" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className='font-JakartaSemiBold text-lg'>{item?.quantity}</Text>
                        <TouchableOpacity>
                            <Entypo name="minus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />

            {
                cart?.length > 0 && (
                        <UniButton
                            title="Pay with crypto"
                            onPress={() => {}}
                            loading={loading}
                        />
                )
            }
    </SafeAreaView>
    </GestureHandlerRootView>

  )
}

export default Cart