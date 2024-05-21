


// // import React from 'react';

// // import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import PosesScreen from './PosesScreen';
// // import DetailScreen from './DetailScreen';
// // import FlowsScreen from './FlowsScreen';
// // import tw from 'twrnc';
// // import { useDeviceContext } from 'twrnc';
// // import { StatusBar } from 'react-native';

// // const Stack = createStackNavigator();

  


import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import tw, { useDeviceContext } from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//this variable will store the value of the title of each note.
// const title = 

const Notes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{
          headerStyle: tw`bg-gray-900 border-none border-0`,
          headerTintColor: '#fff',
          headerTitleStyle: tw`font-bold`,
          headerShadowVisible: false, // gets rid of border on device
        }}
        name="Notes" />
    </Stack.Navigator>
  );
};

export default function App() {
  useDeviceContext(tw);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData(20));
  }, []);

  const generateData = (count) => Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));

  const renderItem = ({ item, i }) => (
    <Text style={[tw`bg-gray-100 text-black-500 m-2 border-2 rounded p-2`, { height: Math.floor(Math.random() * 100) + 50 }]}>
      {/* {item.id} */}Sup y'all
    </Text>
  );

  return (
    <View style={tw`flex-1`}>
      <View style={tw`w-full h-10 mt-2 content-center`}>
        <Text style={tw`text-xl font-sans md:font-serif text-center`}>Notes App</Text>
      </View>
      <View style={tw`w-full h-15 py-2 px-3 rounded-xl bg-green-300 flex-row items-center mb-3 mr-3 ml-1`}>
        <TextInput placeholder="Search" style={tw`w-full h-12 p-2 bg-blue-100 rounded-lg m-2 text-gray-400`} />
        {/* <Text style={tw`text-left`}>Search Bar Goes Here</Text> */}
      </View>
      {/* this is if I want it in the top */}
      {/* <View>
        <TouchableOpacity style={tw`w-50 py-2 px-2 rounded-lg bg-gray-300`}>
          <Text style={tw`text-left`}>Add Note</Text>
        </TouchableOpacity>
      </View> */}
      <MasonryList 
        style={tw`w-full h-screen`}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        //contentContainerStyle={tw`p-4`}
      />
      {/* this is if i want it bottom right */}
      <View style={tw`p-4 items-center`}>
        <TouchableOpacity style={tw`absolute bottom-4 right-4 py-7 px-7 rounded-full bg-pink-300`} activeOpacity={0.5}>
          <Icon name="plus" size={20} color="#FFF" />
          {/* <Text>+</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
