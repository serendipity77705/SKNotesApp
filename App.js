import { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Button, TextInput, Touchable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import MasonryList from '@react-native-seoul/masonry-list'
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from './db';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeListener } from '@reduxjs/toolkit';

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const { data: searchData, error, isLoading } = useSearchNotesQuery(search);
  const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation();
  const [ deleteNote ] = useDeleteNoteMutation();
  
  
  useEffect(() => {
    if (addNoteData != undefined) {
      navigation.navigate("Edit", {data: addNoteData, deleteNote});
    } 
  }, [addNoteData]);

  //this adds an icon to the side and only that icon being pressed deletes the note.
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Edit", {data: item})}>
      <View style={tw`w-[98%] mb-0.5 mx-auto bg-orange-300 rounded-sm px-1 items-center justify-between`}>
        <View>
          <Text style={tw`font-bold text-left`}>{item.title}</Text>
        </View>
          <Text style={[tw`flex-1`, { maxHeight: 250, overflow: 'hidden' }]}>
            {item.content}
          </Text>
          <TouchableOpacity onPress={() => deleteNote(item)}>
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 items-center justify-center bg-red-400`}>
      <View style={tw`w-full h-15 py-2 px-3 rounded-xl bg-green-300 flex-row items-center mb-3 mr-3 ml-1`}>
        <TextInput placeholder="Search" style={tw`w-full h-12 p-2 bg-blue-100 rounded-lg m-2 text-gray-400`} value={search} onChangeText={setSearch}/>
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
      <TouchableOpacity onPress={() => { addNote({title: "", content: ""}); }} style={tw`bg-blue-500 rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}>
        <Text style={tw`text-white text-center text-3xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditScreen({ route, navigation }) {
  const { data } = route.params;
  const [text, setText] = useState(data.content);
  const [title, setTitle] = useState(data.title);

  const [ updateNote ] = useUpdateNoteMutation();
  const[ deleteNote ] = useDeleteNoteMutation();

  //doesn't register any new note being made
  // navigation.addListener('beforeRemove', (e) => {
  //   if (text == "") {
  //     console.log("should delete");
  //     deleteNote(data);
  //   }
  // });
  // return removeListener;
  
  useLayoutEffect(() => {
    //i can have this place be the one where i change the title based on input
    navigation.setOptions({ 
      headerTitle: () => (
        <TextInput 
          style={tw`w-[100%] h-[100%] bg-green text-white font-bold text-xl`} 
          multiline={false} 
          value={title}
          onChangeText={(newValue) => setTitle(newValue)}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => { deleteNote(data); navigation.goBack(); }}>
          <Icon name="trash" size={30} color="#000" style={tw`mr-4`} />
        </TouchableOpacity>
      )
    });
  }, [navigation, data.id, title]);

  useEffect(() => {
    const debounceSave = setTimeout(() => {
      updateNote({ id: data.id, title, content: text});
    }, 100);

    return () => clearTimeout(debounceSave);
  }, [text, title, updateNote, data.id]);

  return (
    <View style={tw`flex-1 items-left bg-white`}>
      <TextInput 
      style={tw`w-[100%] h-[100%] bg-white text-black py-2 pl-2 my-1`} 
      multiline={true} 
      value={text}
      onChangeText={(newValue) => setText(newValue)}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
          <Stack.Screen
            options={{
              title: "Notes",
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
              headerStyle: tw`bg-purple-300 border-0`,
              headerTintColor: '#fff',
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