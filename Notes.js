import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';
import tw from 'twrnc';

export default function App () {
  const [text, setText] = useState();
  return (
    <View>
      <TextInput style={tw`w-48 h-8 bg-gray-500 rounded-lg text-white pl-2 my-1`} placeholder="" value={text} onChangeText={(newValue) => setText(newValue)}/>
      <Text>Entered Text: {text}</Text>
    </View>
  );
}