// import React, { useEffect, useState, useLayoutEffect } from 'react';
// import { Text, SafeAreaView, View, TouchableOpacity, StatusBar, TextInput } from 'react-native';
// import MasonryList from '@react-native-seoul/masonry-list';
// import tw, { useDeviceContext } from 'twrnc';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import { createStackNavigator } from '@react-navigation/stack';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider } from 'react-redux';
// // import { store } from './store';
// import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation } from './db';

// // const Stack = createStackNavigator();

// function NoteScreen({ navigation }) {
//   const {data: searchData, error, isLoading} = useSearchNotesQuery("");
//   const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation();
//   const [ deleteNote ] = useDeleteNoteMutation();

//   useEffect(() => {
//     if(addNoteData != undefined) {
//       navigation.navigate("Edit", {data: addNote});
//     }
//   }, [addNoteData]);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => deleteNote(item)} style={tw`w-[98%] mb-0.5 mx-auto bg-purple-300 rounded-sm px-1`}>
//       <Text>{item.title} {item.id}</Text>
//     </TouchableOpacity>
//   )

//   return (
//     <View style={tw`flex-1 items-center justify-center bg-purple-400`}>
//       {searchData ?
//         <MasonryList
//           style={tw`px-0.5 pt-0.5 pb-20`}
//           data={searchData}
//           numColumns={2}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//         /> 
//         : <></>
//       }
//       <TouchableOpacity onPress={() => { addNote({title: "test", content: "content"}); }} style={tw`bg-blue-500 rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}>
//         <Text style={tw`text-white text-center text-3xl mt--1`}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function EditScreen({ route, navigation }) {
//   useLayoutEffect(() => {
//       navigation.setOptions({ title: route.params.data.title });
//     }, []);

//     return (
//       <View style={tw`flex-1 items-center justify-center bg-purple-400`}>
//         <Text style={tw`text-lg text-white`}>Edit Screen {route.params.data.title} {route.params.data.id}</Text>
//       </View>
//     );
// }

// const Stack = createNativeStackNavigator();


// // const Notes = () => {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen 
// //         options={{
// //           headerStyle: tw`bg-gray-900 border-none border-0`,
// //           headerTintColor: '#fff',
// //           headerTitleStyle: tw`font-bold`,
// //           headerShadowVisible: false, // gets rid of border on device
// //         }}
// //         name="Notes" />
// //     </Stack.Navigator>
// //   );
// // };

// export default function App() {
//   useDeviceContext(tw);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(generateData(20));
//   }, []);

//   const generateData = (count) => Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));

//   const renderItem = ({ item, i }) => (
//     <Text style={[tw`bg-gray-100 text-black-500 m-2 border-2 rounded p-2`, { height: Math.floor(Math.random() * 100) + 50 }]}>
//       {/* {item.id} */}Sup y'all
//     </Text>
//   );

  

//   // return (
//   //   <View style={tw`flex-1`}>
//   //     <View style={tw`w-full h-10 mt-2 content-center`}>
//   //       <Text style={tw`text-xl font-sans md:font-serif text-center`}>Notes App</Text>
//   //     </View>
//   //     <View style={tw`w-full h-15 py-2 px-3 rounded-xl bg-green-300 flex-row items-center mb-3 mr-3 ml-1`}>
//   //       <TextInput placeholder="Search" style={tw`w-full h-12 p-2 bg-blue-100 rounded-lg m-2 text-gray-400`} />
//   //       {/* <Text style={tw`text-left`}>Search Bar Goes Here</Text> */}
//   //     </View>
//   //     {/* this is if I want it in the top */}
//   //     {/* <View>
//   //       <TouchableOpacity style={tw`w-50 py-2 px-2 rounded-lg bg-gray-300`}>
//   //         <Text style={tw`text-left`}>Add Note</Text>
//   //       </TouchableOpacity>
//   //     </View> */}
//   //     <MasonryList 
//   //       style={tw`w-full h-screen`}
//   //       data={data}
//   //       keyExtractor={(item) => item.id}
//   //       numColumns={2}
//   //       showsVerticalScrollIndicator={false}
//   //       renderItem={renderItem}
//   //       onEndReachedThreshold={0.1}
//   //       //contentContainerStyle={tw`p-4`}
//   //     />
//   //     {/* this is if i want it bottom right */}
//   //     <View style={tw`p-4 items-center`}>
//   //       <TouchableOpacity style={tw`absolute bottom-4 right-4 py-7 px-7 rounded-full bg-pink-300`} activeOpacity={0.5}>
//   //         <Icon name="plus" size={20} color="#FFF" />
//   //         {/* <Text>+</Text> */}
//   //       </TouchableOpacity>
//   //     </View>
//   //   </View>
//   // );
// }

import { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Button, TextInput, Touchable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import MasonryList from '@react-native-seoul/masonry-list'
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation } from './db';
import Icon from 'react-native-vector-icons/FontAwesome';

// const [text, setText] = useState();
// const noteTitle = [text,setText] => 

function HomeScreen({ navigation }) {
  const { data: searchData, error, isLoading } = useSearchNotesQuery("");
  const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation();
  const [ deleteNote ] = useDeleteNoteMutation();
  
  useEffect(() => {
    if (addNoteData != undefined) {
      // console.log(addNoteData.title);
      navigation.navigate("Edit", {data: addNoteData, deleteNote});
    }
  }, [addNoteData]);

  //this added an icon yes but you could press anywhere and it would delete.
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => deleteNote(item) } style={tw`w-[98%] mb-0.5 mx-auto bg-purple-300 rounded-sm px-1`}> 
  //     <Text>{item.title} {item.id}</Text>
  //     <Icon name="trash" size={20} color="#000" />
  //   </TouchableOpacity>
  // //   <TouchableOpacity onPress={() => deleteNote(item) } style={tw`w-[98%] mb-0.5 mx-auto bg-purple-300 rounded-sm px-1`}> 
  // //     <Icon name="trash" size={20} color="#000" />
  // // </TouchableOpacity>
  // );


  //this adds an icon to the side and only that icon being pressed deletes the note.
  const renderItem = ({ item }) => (
    // <TouchableOpacity onPress={() => navigation.navigate("Edit", {id: item.id})}>
    <TouchableOpacity onPress={() => navigation.navigate("Edit", {data: item})}>
      <View style={tw`w-[98%] mb-0.5 mx-auto bg-orange-300 rounded-sm px-1 flex-row items-center justify-between`}>
      {/* <Text style={tw`flex-1`}> {item.title} ? {item.id} </Text> */}
      <Text style={tw`flex-1`}>{item.content}</Text>
      <TouchableOpacity onPress={() => deleteNote(item)}>
        <Icon name="trash" size={20} color="#000" />
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
    
  );

  return (
    <View style={tw`flex-1 items-center justify-center bg-red-400`}>
      <View style={tw`w-full h-15 py-2 px-3 rounded-xl bg-green-300 flex-row items-center mb-3 mr-3 ml-1`}>
        <TextInput placeholder="Search" style={tw`w-full h-12 p-2 bg-blue-100 rounded-lg m-2 text-gray-400`} />
        {/* <Text style={tw`text-left`}>Search Bar Goes Here</Text> */}
      </View>
      {searchData ? 
        <MasonryList
          style={tw`px-0.5 pt-0.5 pb-20`}
          data={searchData}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />  
        : <></>
      }
      {/* this is the place where the title should be changed based on input.  */}
      <TouchableOpacity onPress={() => { addNote({title: "title", content: "content"}); }} style={tw`bg-blue-500 rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}>
        <Text style={tw`text-white text-center text-3xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditScreen({ route, navigation }) {
  const [text, setText] = useState();
  
  useLayoutEffect(() => {
    //i can have this place be the one where i change the title based on input
    navigation.setOptions({ 
      title: "Hello",
      headerRight: () => (
        <TouchableOpacity onPress={() => { deleteNote(data); navigation.goBack(); }}>
          <Icon name="trash" size={30} color="#000" style={tw`mr-4`} />
        </TouchableOpacity>
      )
    });
  }, []);

  return (
    // <View style={tw`flex-1 items-center justify-center bg-purple-400`}>
    //   <Text style={tw`text-lg text-white`}>Sup my dudes {route.params.data.title} {route.params.data.id}</Text>
    // </View>
    <View style={tw`flex-1 items-left bg-yellow-50`}>
      <TextInput 
      style={tw`w-[98%] h-48 bg-white rounded-lg text-black py-2 pl-2 my-1`} 
      multiline={true} 
      onChangeText={(newValue) => setText(newValue)}/>
      <Text style={tw`text-sm text-black`}>
        Edit Screen {route.params.data.title} {route.params.data.id}
      </Text>
      <Text>{text}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  useDeviceContext(tw);
  // const [text, setText] = useState();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
          <Stack.Screen
            options={{
              headerStyle: tw`bg-blue-50 border-0`,
              headerTintColor: '#000',
              headerTitleStyle: tw`font-bold`,
              headerTitleAlign: 'center',
              headerShadowVisible: false, // gets rid of border on device
            }}
            name="Notes"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerStyle: tw`bg-green-300 border-0`,
              headerTintColor: '#fff',
              // headerTitleStyle: tw`font-bold`,
              headerShadowVisible: false, // gets rid of border on device
              headerRight: () => ( 
                 <TouchableOpacity>
                    <Icon name="trash" size={30} color="#000" style={tw`mr-4`} onPress={() => deleteNote(item) }/>
                 </TouchableOpacity>
                 ),
            }}
            name="Edit"
            component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}