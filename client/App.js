/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef } from 'react';
import RenderHtml from 'react-native-render-html';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  Text,
  useWindowDimensions
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        onEndEditing={function () {
          window.Evennia.msg('text', [text])
          onChangeText('')
        }}
      />
    </SafeAreaView>
  );
};

const App: () => Node = () => {
  
  const { width } = useWindowDimensions();
  const mainScrollView = useRef()
  const [serverMessages, setServerMessages] = React.useState([]);

  // Handle incoming messages from server and append to serverMessages array
  useEffect((e) => {
    const serverMessagesList = [];
    Evennia.emitter.on('text', (msg) => {
      serverMessagesList.push(msg[0]);
      setServerMessages([...serverMessagesList])
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: 14 }}>
        <ScrollView
          ref={mainScrollView}
          contentInsetAdjustmentBehavior="automatic"
          onContentSizeChange={() => mainScrollView.current.scrollToEnd()}
        ><RenderHtml contentWidth={width} source={{ html: serverMessages.join('<br/><br/>') }} /></ScrollView>
        <UselessTextInput />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
